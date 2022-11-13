import './Home.scss'
import Navbar from '../../components/Navbar/Navbar'
import Categories from '../../components/Categories/Categories'
import Slider from '../../components/Slider/Slider'
import TopOferts from '../../components/TopOferts/TopOferts'

const Home: React.FC = () => {
    return (
    <>
    <Navbar />
    <Categories/>
    <Slider />
    <TopOferts/>
    </>
     )
}


export default Home