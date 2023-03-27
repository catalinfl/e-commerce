import React, { useEffect, useState } from 'react'
import './Searchpage.scss'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import CardProduct from '../Card/CardProduct';
import { Route, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineConsoleSql } from 'react-icons/ai';

type SortProductsType = "name" | "relevance" | "growing" | "descending" | "most sold" | "biggest discount"


type ProductData = {
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
  const [sortProducts, setSortProducts] = useState<SortProductsType>("relevance");
  const [productData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    fetchData()
  }, [category])  

  const fetchData = async () => {
    axios.get(`http://localhost:3001/product/search/${category?.slice(0, 1)?.toUpperCase() as string + category?.slice(1)}`)
    .then(res => {
      setProductData(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const sortOptionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortProducts(e.target.value as SortProductsType)
  }


  function sortProductsHandler (sortProducts: SortProductsType) {
    switch (sortProducts) {
      case "name":
        return productData.sort((a: ProductData, b: ProductData) => {
          return a.name.localeCompare(b.name)
        })
      case "relevance":
        return productData.sort((a: ProductData, b: ProductData) => {
          return parseInt(a.reviewStars) - parseInt(b.reviewStars)
        })
      case "growing":
        return productData.sort((a: ProductData, b: ProductData) => {
          return parseInt(b.price) - parseInt(a.price)
        })
      case "descending":
        return productData.sort((a: ProductData, b: ProductData) => {
          return parseInt(a.price) - parseInt(b.price)
        })
      case "most sold":
        return setProductData([productData[0]] as ProductData[])
      case "biggest discount":
        return productData.sort((a, b) => Number(b.discount) - Number(a.discount))
      default:
        return productData.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  useEffect(() => {
    sortProductsHandler(sortProducts);
    setProductData(productData);
  }, [sortProducts])


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
                <select className="searchpageSelection" id="selection" onChange={sortOptionHandler}>
                  <option className="searchpageOption" value="relevance"> Relevanta </option> 
                  <option className="searchpageOption" value="name"> Nume </option> 
                  <option className="searchpageOption" value="growing"> Crescator </option> 
                  <option className="searchpageOption" value="descending"> Descrescator </option> 
                  <option className="searchpageOption" value="most sold" > Cele mai vandute </option> 
                  <option className="searchpageOption" value="biggest discount"> Cel mai mare discount </option> 
                </select>
              </div>
              <div className="searchpageItemsContainer">
                { productData ? 
                  <div className="searchpageItemsFound">
                    {productData.map((product: ProductData) => {
                      return (
                        <CardProduct
                        price={product.price}
                        title={product.name}
                        image={product.img[1]}
                        rating={product.reviewStars}
                        reviews={product.reviewComments.length.toString()}
                        _id={product._id}
                        />
                        )
                    })}
                  </div> 
                : <p> Nu s-au gasit produse </p>}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Searchpage