import Slide from "../components/Slide";
import ProductNew from "../components/ProductNew";

const Home = () => {
    alert('Website này tạo ra nhằm mục đích thực hành lại kiến thức đã học')
    document.title='Trang chủ'
    return <main style={{minHeight: 1000}}>
        <Slide/>
        <ProductNew/>
    </main>
}
export default Home