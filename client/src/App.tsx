import Home from "./pages/Home/Home"
import './App.scss'
import TopOferts from "./components/TopOferts/TopOferts"
import { useLocation } from "react-router-dom";

function App() {  
  return (
    <>
    <Home />
    <TopOferts />
    </>
    )
}

export default App
