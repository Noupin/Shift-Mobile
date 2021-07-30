//Third Party Imports
import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

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
import { MainStyles } from '../Styles/MainStyles';


interface IHome extends IElevatedStateProps{}

export const Home: FC<IHome> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  let [categoryNames, setCategoryNames] =  useState<CategoriesResponse["categories"]>([])

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])
  const defaultCategories = ["Featured", "Popular", "New"]

  const fetchNewCategory = useFetch(elevatedState.APIInstaces.Category,
                                    elevatedState.APIInstaces.Category._new,
                                    elevatedState, setElevatedState,
                                    (newResponse: NewShiftsResponse) => 
                                      setNewShifts(newResponse.shifts!))
  const fetchPopularCategory = useFetch(elevatedState.APIInstaces.Category,
                                        elevatedState.APIInstaces.Category.popular,
                                        elevatedState, setElevatedState,
                                        (popularResponse: PopularShiftsResponse) => 
                                          setPopularShifts(popularResponse.shifts!))
  const fetchFeaturedCategory = useFetch(elevatedState.APIInstaces.Category,
                                         elevatedState.APIInstaces.Category.category,
                                         elevatedState, setElevatedState,
                                         (featuredResponse: ShiftCategoryResponse) => 
                                           setFeaturedShifts(featuredResponse.shifts!))
  const fetchCategory = useFetch(elevatedState.APIInstaces.Category,
                                 elevatedState.APIInstaces.Category.category,
                                 elevatedState, setElevatedState,
                                 (categoryResponse: ShiftCategoryResponse, category: string) =>{
                                   let categoryShifts: ShiftCategories = {
                                     category: category,
                                     shifts: categoryResponse.shifts!
                                   }
                                   setShiftCategories((prev) => [...prev, categoryShifts])
                                 })
  const fetchCategories = useFetch(elevatedState.APIInstaces.Category,
                                   elevatedState.APIInstaces.Category.categories,
                                   elevatedState, setElevatedState,
                                   (categoriesResponse: CategoriesResponse) => {
                                     setCategoryNames(categoriesResponse.categories.filter(
                                       (category: string) => CATEGORIES_TO_REMOVE.indexOf(category) === -1
                                     ))
                                   })


  useEffect(() => {
    fetchNewCategory()
    fetchPopularCategory()
    fetchFeaturedCategory({categoryName: "featured"})

    async function getCategoryNames(){
      const categoriesParams: CategoriesRequest = {
        maximum: CATEGORIES_TO_GET
      }
      await fetchCategories(categoriesParams)
    }
    
    getCategoryNames()
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


  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={[{flexDirection: 'column', flex: 1}]}>
        <View style={{flexDirection: 'column', height: CATEGORY_HEIGHT}}>
          <FText style={{marginLeft: 15, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
            Featured
          </FText>
          <FlatList horizontal data={featuredShifts}
          renderItem={(item) => <FShiftCard shift={item.item}/>}
          keyExtractor={item => String(item.id)}/>
        </View>
        <View style={{flexDirection: 'column', height: CATEGORY_HEIGHT}}>
          <FText style={{marginLeft: 15, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
            Popular
          </FText>
          <FlatList horizontal data={popularShifts} keyExtractor={item => String(item.id)}
          renderItem={(item) => <FShiftCard shift={item.item}/>}/>
        </View>
        <View style={{flexDirection: 'column', height: CATEGORY_HEIGHT}}>
          <FText style={{marginLeft: 15, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
            New
          </FText>
          <FlatList horizontal data={newShifts} keyExtractor={item => String(item.id)}
          renderItem={(item) => <FShiftCard shift={item.item}/>}/>
        </View>
      </View>
    </View>
  );
}