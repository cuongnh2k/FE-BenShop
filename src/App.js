import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PurchaseOrder from "./pages/PurchaseOrder";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminProduct from "./pages/admin/AdminProduct";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminUser from "./pages/admin/AdminUser";

const App = () => {
    return <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product-detail' element={<Detail/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/purchase-order' element={<PurchaseOrder/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/admin/category' element={<AdminCategory/>}/>
            <Route path='/admin/order' element={<AdminOrder/>}/>
            <Route path='/admin/product' element={<AdminProduct/>}/>
            <Route path='/admin/user' element={<AdminUser/>}/>
        </Routes>
    </>
}
export default App;
