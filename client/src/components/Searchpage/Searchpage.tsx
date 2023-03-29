import React, { useEffect, useState } from 'react'
import './Searchpage.scss'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import CardProduct from '../Card/CardProduct';
import { Route, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductMapping from './ProductMapping';

export type SortProductsType = "name" | "relevance" | "growing" | "descending" | "most sold" | "biggest discount"


export type ProductData = {
  _id: string,
  name: string,
  price: string,
  quantity: number,
  img: string,
  category: string,
  description: string,
  discount: number,
  reviewStars: string,
  reviewComments: string,
  brand: string,
  warranty: string,
  availability: string,
}



const Searchpage: React.FC = () => {

  const { category } = useParams<{ category: string }>()
  const [sortProducts, setSortProducts] = useState<SortProductsType>("name");
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [localData, setLocalData] = useState<ProductData[]>([]);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [oscillant, setOscillant] = useState<boolean | string>(false);
  
  const fetchData = async () => {
    axios.get(`http://localhost:3001/product/search/${category?.slice(0, 1)?.toUpperCase() as string + category?.slice(1)}`)
    .then(res => {
      setProductData(res.data)
      setIsDataFetched(true);
      setLocalData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    fetchData()
  }, [category])





  const setSortedArray = (method: string) => {
    setOscillant(!oscillant)
    if (method === "relevance") {
      setProductData(localData.sort((a: any, b: any) => {
        if (a.reviewStars > b.reviewStars) {
          return 1
        }
        if (a.reviewStars < b.reviewStars) {
          return -1
        }
        return 0
      }))
    }
    // do this if statement for all the other sorting methods
    if (method === "name") {
      setProductData(localData.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      }))
    }
    // do this if statement for all the other sorting methods
    if (method === "growing") {
      setProductData(localData.sort((a, b) => {
        if (a.price < b.price) {
          return 1
        }
        if (a.price > b.price) {
          return -1
        }
        return 0
      }))
    }
    // do this if statement for all the other sorting methods
    if (method === "descending") {
      setProductData(localData.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        return 0
      }))
    }
    if (method === "most sold") {
      setProductData(localData.sort((a, b) => {
        if (a.quantity > b.quantity) {
          return 1
        }
        if (a.quantity < b.quantity) {
          return -1
        }
        return 0
      }
      ))
    }
    // do this if statement for all the other sorting methods
    if (method === "biggest discount") {
        setProductData(localData.sort((a: any, b: any) => {
          if (a.reviewStars < b.reviewStars) {
            return 1
          }
          if (a.reviewStars > b.reviewStars) {
            return -1
          }
          return 0
        }))
    }
  }




  return (

    <div className="searchpage">
        <p className="searchCategory"> IT / Calculatoare / <span className="searchC"> Test </span> </p>
      <div className="searchpageContainer">
        <div className="searchpageCheckContainers">
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Disponibilitate </h3>
                <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                </div>
            </div>
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Pret </h3>
              <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
              </div>
            </div>
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Brand </h3>
              <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (1) </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (2) </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (65)</Checkbox>
            </div>
          </div>
          </div>
          <div className="searchpageItemsSearched">
              <p className="searchpageResultTitle">
              &#127774; Rezultate cautare: {category}
              </p>
              <div className="searchpageSort">
                <p> Sorteaza dupa: </p>
                <select className="searchpageSelection" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortedArray(e.target.value)}>
                  <option className="searchpageOption" value="relevance"> Relevanta </option> 
                  <option className="searchpageOption" value="name"> Nume </option> 
                  <option className="searchpageOption" value="growing"> Crescator </option> 
                  <option className="searchpageOption" value="descending"> Descrescator </option> 
                  <option className="searchpageOption" value="most sold" > Cele mai vandute </option> 
                  <option className="searchpageOption" value="biggest discount"> Cel mai mare discount </option> 
                </select>
              </div>
              <ProductMapping productData={productData} sortProducts={sortProducts}/>
          </div>
        </div>
      </div>
  )
}

export default Searchpage