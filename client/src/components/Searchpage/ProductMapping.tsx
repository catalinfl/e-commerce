import React from 'react'
import { ProductData, SortProductsType } from './Searchpage'
import CardProduct from '../Card/CardProduct'

type ProductMappingType = {
    productData: ProductData[],
    sortProducts: SortProductsType
}


const ProductMapping = ({ productData, sortProducts }: ProductMappingType) => {
  return (
        <div className="searchpageItemsContainer">
                <div className="searchpageItemsFound">
                {productData.map((product: ProductData, index: number) => {
                    return (
                        <CardProduct
                            key={index}
                            _id={product._id}
                            title={product.name}
                            price={product.price}
                            oldPrice={product.price}
                            image={product.img}
                            rating={product.reviewStars}
                            reviews={product.reviewComments}
                            
                        />
                    )
                })
                }
                  </div> 
            </div>
    )
}

export default ProductMapping