import React, { useEffect, useRef, useState } from 'react'
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

  const getMaxPrice = () => {
    let max = 0;
    localData.forEach((item: any) => {
      if (parseInt(item.price) > max) {
        max = parseInt(item.price)
      }
    })
    return max;
  }

  const onChangeRefRange = () => {
      setPriceRange(parseInt(refRange.current?.value as string)) 
  }

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
                  <input ref={refRange} type="range" min={0} step={10} max={getMaxPrice()} onChange={() => onChangeRefRange()} />
                  <p> {priceRange} lei </p>
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
          <input type="text" />
        </div>
  }
      </div>
  )
}

export default Searchpage