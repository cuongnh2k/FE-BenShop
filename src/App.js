import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Detail from "./pages/Detail";
import Footer from "./components/Footer";
import Login from "./pages/Login";

const App = () => {
    return <>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product-detail' element={<Detail/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
    </>
}
export default App;
