//Third Party Imports
import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { CATEGORIES_TO_GET, CATEGORIES_TO_REMOVE, CATEGORY_HEIGHT } from '../constants';
import { useFetch } from '../Hooks/Fetch';
import { CategoriesResponse, Shift, NewShiftsResponse, PopularShiftsResponse,
  ShiftCategoryResponse, CategoriesRequest, CategoryRequest} from '../Swagger';
import { ShiftCategories } from '../Interfaces/ShiftCategory';
import { FShiftCard } from '../Components/ShiftCard';
import { Load } from './Load';


interface IHome extends IElevatedStateProps{
  startLoading?: boolean
}

export const Home: FC<IHome> = ({elevatedState, setElevatedState, startLoading=false}) => {
  const navigation = useNavigation()
  console.log(startLoading)
  const safeArea = useSafeAreaInsets()

  const [categoryNames, setCategoryNames] =  useState<CategoriesResponse["categories"]>([])
  const [combinedCategories, setCombinedCategories] = useState(false);
  const [initalCategoriesLoaded, setInitialCategoriesLoaded] = useState(false)

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])
  const defaultCategories = ["Featured", "Popular", "New"]
  const [allShiftCategories, setAllShiftCategories] = useState<ShiftCategories[]>([])

  const fetchNewCategory = useFetch(elevatedState.APIInstances.Category,
                                    elevatedState.APIInstances.Category._new,
                                    elevatedState, setElevatedState,
                                    (newResponse: NewShiftsResponse) => 
                                      setNewShifts(newResponse.shifts!))
  const fetchPopularCategory = useFetch(elevatedState.APIInstances.Category,
                                        elevatedState.APIInstances.Category.popular,
                                        elevatedState, setElevatedState,
                                        (popularResponse: PopularShiftsResponse) => 
                                          setPopularShifts(popularResponse.shifts!))
  const fetchFeaturedCategory = useFetch(elevatedState.APIInstances.Category,
                                         elevatedState.APIInstances.Category.category,
                                         elevatedState, setElevatedState,
                                         (featuredResponse: ShiftCategoryResponse) => 
                                           setFeaturedShifts(featuredResponse.shifts!))
  const fetchCategory = useFetch(elevatedState.APIInstances.Category,
                                 elevatedState.APIInstances.Category.category,
                                 elevatedState, setElevatedState,
                                 (categoryResponse: ShiftCategoryResponse, category: string) =>{
                                   let categoryShifts: ShiftCategories = {
                                     category: category,
                                     shifts: categoryResponse.shifts!
                                   }
                                   setShiftCategories((prev) => [...prev, categoryShifts])
                                   setCombinedCategories(false)
                                 })
  const fetchCategories = useFetch(elevatedState.APIInstances.Category,
                                   elevatedState.APIInstances.Category.categories,
                                   elevatedState, setElevatedState,
                                   (categoriesResponse: CategoriesResponse) => {
                                     setCategoryNames(categoriesResponse.categories.filter(
                                       (category: string) => CATEGORIES_TO_REMOVE.indexOf(category) === -1
                                     ))
                                   })


  useEffect(() => {
    async function initialLoad(){
      await fetchFeaturedCategory({categoryName: "featured"})
      await fetchPopularCategory()
      await fetchNewCategory()

      setInitialCategoriesLoaded(true)

      async function getCategoryNames(){
        const categoriesParams: CategoriesRequest = {
          maximum: CATEGORIES_TO_GET
        }
        await fetchCategories(categoriesParams)
      }
      
      await getCategoryNames()
    }

    initialLoad()
  }, [])

  useEffect(() => {
    if(!initalCategoriesLoaded) return;

    setAllShiftCategories([
      {
        category: defaultCategories[0],
        shifts: featuredShifts
      },
      {
        category: defaultCategories[1],
        shifts: popularShifts
      },
      {
        category: defaultCategories[2],
        shifts: newShifts
      },
    ])
  }, [initalCategoriesLoaded])

  useEffect(() => {
    if(categoryNames.length === 0) return;

    async function getShifts(){
      categoryNames.forEach(async (category) => {
        const categoryParams: CategoryRequest = {
          categoryName: category
        }
        await fetchCategory(categoryParams, category)
      })
    }

    getShifts();
  }, [categoryNames])

  useEffect(() => {
    if(combinedCategories || shiftCategories.length === 0 || allShiftCategories.length === 0) return;

    setAllShiftCategories(prev => ([...prev, ...shiftCategories]))
    setCombinedCategories(true)
  }, [shiftCategories, allShiftCategories])


  return (
    <>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          <FlatList data={allShiftCategories} keyExtractor={(item) => item.category}
          renderItem={(item) => (
            <View style={{flexDirection: 'column', height: CATEGORY_HEIGHT}}>
              <FText style={{marginLeft: 15, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
                {item.item.category}
              </FText>
              <FlatList horizontal data={item.item.shifts} keyExtractor={item => String(item.id)}
              renderItem={(item) => <FShiftCard shift={item.item}/>}/>
            </View>
          )}/>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: -safeArea.bottom, left: 0, right: 0}}>
        <Load key={startLoading.toString()} startOpen={startLoading} elevatedState={elevatedState} setElevatedState={setElevatedState}/>
      </View>
    </>
  );
}