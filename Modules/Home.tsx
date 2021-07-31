//Third Party Imports
import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { BOTTOM_SAFE_AREA_MARGIN, CATEGORIES_TO_GET, CATEGORIES_TO_REMOVE, CATEGORY_HEIGHT } from '../constants';
import { useFetch } from '../Hooks/Fetch';
import { CategoriesResponse, Shift, NewShiftsResponse, PopularShiftsResponse,
  ShiftCategoryResponse, CategoriesRequest, CategoryRequest} from '../Swagger';
import { ShiftCategories } from '../Interfaces/ShiftCategory';
import { FShiftCard } from '../Components/ShiftCard';
import { Load } from './Load';


interface IHome extends IElevatedStateProps{}

export const Home: FC<IHome> = ({elevatedState, setElevatedState}) => {
  let [categoryNames, setCategoryNames] =  useState<CategoriesResponse["categories"]>([])
  let [combinedCategories, setCombinedCategories] = useState(false);

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])
  const defaultCategories = ["Featured", "Popular", "New"]

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
      await fetchNewCategory()
      await fetchPopularCategory()
      await fetchFeaturedCategory({categoryName: "featured"})

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
    if(combinedCategories || shiftCategories.length === 0) return;

    const defaultShiftCategories: ShiftCategories[] = [
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
    ]

    setShiftCategories(prev => ([...defaultShiftCategories, ...prev]))
    setCombinedCategories(true)
  }, [shiftCategories])


  return (
    <>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          <FlatList data={shiftCategories} keyExtractor={(item) => item.category}
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
      <View style={{position: 'absolute', bottom: -BOTTOM_SAFE_AREA_MARGIN, left: 0, right: 0}}>
        <Load elevatedState={elevatedState} setElevatedState={setElevatedState}/>
      </View>
    </>
  );
}