import {Link} from "react-router-dom";

const ProductDetail = () => {
    return <>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/<Link to="/product">Sản phẩm</Link>/Chi tiết
        </p>

    </>
}
export default ProductDetail