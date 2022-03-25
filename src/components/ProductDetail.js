import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";

const ProductDetail = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {
            productImages: [{path: null}]
        }})

    let productId = ''
    let location = useLocation()
    if (location.search !== '') {
        productId = location.search.split('=')[1]
    } else {
        window.location = Domain + "/product"
    }

    useEffect(() => {
        fetch(BasicApi.getProductById(productId).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, []);

    console.log(product.data.productImages[0].path)

    return <>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/<Link to="/product">Sản phẩm</Link>/Chi tiết
        </p>
        <div className="row">
            <div className="col-6">
                <div></div>
                <img style={{maxHeight: 500}} className="img-thumbnail" src={product.data.productImages[0].path} alt={product.data.name}/>
            </div>

        </div>
    </>
}
export default ProductDetail