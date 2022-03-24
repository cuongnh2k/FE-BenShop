import Slide from "../components/Slide";
import ProductNew from "../components/ProductNew";

const Home = () => {
    document.title='Trang chủ'
    return <main style={{minHeight: 1000}}>
        <Slide/>
        <ProductNew/>
    </main>
}
export default Home