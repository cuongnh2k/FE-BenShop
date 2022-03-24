import Footer from "./components/Footer";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Account from "./pages/Account";

const App = () => {
    return <>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product-detail' element={<ProductDetail/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/account' element={<Account/>}/>
        </Routes>
        {/*<Footer/>*/}
    </>
}
export default App;
