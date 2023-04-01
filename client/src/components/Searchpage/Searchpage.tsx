import React, { useEffect, useRef, useState } from 'react'
import './Searchpage.scss'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import CardProduct from '../Card/CardProduct';
import { Route, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductMapping from './ProductMapping';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react"

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
  const [oscillant, setOscillant] = useState<boolean | string>(false);
  const [isResultFiltered, setIsResultFiltered] = useState<boolean>(false);
  const refRange = useRef<HTMLInputElement>(null);
  const [priceRange, setPriceRange] = useState<number>(0);

  const fetchData = async () => {
    axios.get(`http://localhost:3001/product/search/${category?.slice(0, 1)?.toUpperCase() as string + category?.slice(1)}`)
    .then(res => {
      setProductData(res.data)
      setLocalData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    if (category !== undefined) { 
      setIsResultFiltered(true);
      fetchData()
    }
    else {
      setIsResultFiltered(false);
    }
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
    if (method === "growing") {
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
    if (method === "descending") {
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
    if (method === "biggest discount") {
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
  }

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] =  useState<number>(100);
  const [maxValueToBeWritten, setMaxValueToBeWritten] = useState<number>(max);
  const [minValueToBeWritten, setMinValueToBeWritten] = useState<number>(min);

  
  const getMaxPrice = () => {
    var value = Number.MIN_VALUE;
    if (localData.length > 0) {
      localData.forEach((data) => {
        if (Number(data.price) > value) {
          value = Number(data.price);
        }
      })
    }
    setMax(value)
    setMaxValue(value)
  }
  

  const getMinPrice = () => {
    var value = Number.MAX_VALUE;
    if (localData.length > 0) {
      localData.forEach((item) => {
        if (parseInt(item.price) < value) {
          value = parseInt(item.price)
        }
      })
    }
    setMinValue(value)
    setMin(value)
  }

  useEffect(() => {
    getMaxPrice();
    getMinPrice();
}, [localData])

console.log(min, minValue)

  return (

    <div className="searchpage">
        <p className="searchCategory"> IT / Calculatoare / <span className="searchC"> Test </span> </p>
     { isResultFiltered ?
     <div className="searchpageContainer">
        <div className="searchpageCheckContainers">
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Disponibilitate </h3>
                <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> În magazin </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> Ultimele produse </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> Indisponibil </Checkbox>
                </div>
            </div>
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Pret </h3>
              <div className="searchpageItemCheckbox">
                <MultiRangeSlider min={min}
					max={max}
          ruler={false}
          label={false}
          stepOnly={true}
          labels={["csu", "csu"]}
					step={10}
					minValue={minValue}
					maxValue={maxValue}
          barLeftColor={"white"}
	        barRightColor={"white"}
	        barInnerColor={"lime"}          
	        thumbLeftColor={"green"}
	        thumbRightColor={"green"}
          preventWheel={false}
          style={{
            width: "80%", 
            padding: "0.85rem 1rem",
            border: 'none'
          }}
          onChange={(e: ChangeResult) => {
            setMinValueToBeWritten(e.minValue)
            setMaxValueToBeWritten(e.maxValue)
          }}
          					/>
                  <p> De la <span style={{color: 'green', fontWeight: '600'}}> {minValueToBeWritten} lei </span> la <span style={{color: 'green', fontWeight: '600'}}> {maxValueToBeWritten} lei </span> </p>
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
        :
        <div className="searchpageItemsSearched">
          <p> Search a result </p>
        </div>
        }
      </div>
  )
}

export default Searchpage