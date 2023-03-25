import React, { useEffect, useState } from 'react'
import './Searchpage.scss'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import CardProduct from '../Card/CardProduct';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type SortProducts = {
  sorted: "name" | "relevance" | "growing" | "descending" | "most sold" | "biggest discount"
}

// create a type for productdata
type ProductData = {
  _id: string,
  name: string,
  price: string,
  quantity: number,
  img: string,
  category: string,
  description: string,
  discount: number,
  rating: number,
  reviews: number,
  brand: string,
  warranty: string,
  availability: string,
}



const Searchpage: React.FC = () => {
  

  const { category } = useParams<{ category: string }>()
  const [sortProducts, setSortProducts] = useState<SortProducts>({sorted: "relevance"});
  const [productData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    axios.get(`http://localhost:3001/product/search/${category?.slice(0, 1)?.toUpperCase() as string + category?.slice(1)}`)
    .then(res => {
      setProductData(res.data);
    })
    .catch(err => {
      console.log(err)
    })
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
                <select className="searchpageSelection" id="selection">
                  <option className="searchpageOption" value="relevanta" onClick={() => setSortProducts({sorted: "relevance"} )}> Relevanta </option> 
                  <option className="searchpageOption" value="nume" onClick={() => setSortProducts({sorted: "name"} )}> Nume </option> 
                  <option className="searchpageOption" value="crescator" onClick={() => setSortProducts({sorted: "growing"} )}> Crescator </option> 
                  <option className="searchpageOption" value="descrescator" onClick={() => setSortProducts({sorted: "descending"} )}> Descrescator </option> 
                  <option className="searchpageOption" value="relevanta" onClick={() => setSortProducts({sorted: "most sold"} )}> Cele mai vandute </option> 
                  <option className="searchpageOption" value="relevanta" onClick={() => setSortProducts({sorted: "biggest discount"} )}> Cel mai mare discount </option> 
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
                        rating="30"/>
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