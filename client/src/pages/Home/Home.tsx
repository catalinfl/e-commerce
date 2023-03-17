import './Home.scss'
import Navbar from '../../components/Navbar/Navbar'
import Categories from '../../components/Categories/Categories'
import Slider from '../../components/Slider/Slider'
import TopOferts from '../../components/TopOferts/TopOferts'
import { useEffect, useState } from 'react'
import { publicRequest } from '../../requestMethods'
import { ProductProps } from '../../components/Product/Product'

const Home: React.FC = () => {
    const [products, setProducts] = useState<ProductProps[]>()


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get("/product");
                const filterProducts = res.data.filter((product: ProductProps) => {
                    if (product.top) {
                        return product;
                    }
                })
                setProducts(filterProducts);
            }
            catch(err) {
                console.log(err);
            }
        }
        getProducts();
    }, [])


    return (
    <>
    <Navbar />
    <Categories/>
    <Slider />
    <TopOferts products={products as ProductProps[]}/>
    </>
     )
}


export default Home