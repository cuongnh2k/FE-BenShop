import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import {Link} from "react-router-dom";

const ProductNew = () => {

    const [product, setProduct] = useState({message: null, success: null, data: {content: []}})

    useEffect(() => {
        fetch(BasicApi.searchProduct('sort=id:desc&size=6').url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, []);

    return <>
        <h3 className="text-warning" style={{marginTop: 20}}>Sản phẩm mới</h3>
        <hr/>
        <div className="row">
            {product.data.content.map(o =>
                <div key={o.id} className="col-12 col-md-4 col-xl-2 col-lg-3 col-sm-6">
                    <Link to={`/product-detail?id=${o.id}`}>
                        <img src={o.productImages[0].path} className="card-img-top" alt={o.name}/>
                        <div className="card-body card">
                            <h5 className="card-title text-truncate">{o.name}</h5>
                            <p className="card-text text-center text-truncate text-secondary">
                                <del>{o.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del>
                                VND
                            </p>
                            <p className="card-text text-center text-truncate text-danger">

                                    {o.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND

                            </p>
                            <p className="card-text"><small className="text-muted"></small></p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    </>
}
export default ProductNew