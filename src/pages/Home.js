import Slide from "../components/Slide";
import ProductNew from "../components/ProductNew";

const Home = () => {
    document.title='Trang chủ'
    return <main style={{minHeight: "auto"}}>
        <Slide/>
        <ProductNew/>
    </main>
}
export default Home