import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";

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
                    <img src={o.productImages[0].path} className="card-img-top" alt="..."/>
                    <div className="card-body card">
                        <h5 className="card-title text-truncate">{o.name}</h5>
                        <p className="card-text text-truncate text-secondary"><del>{o.price}</del>VND</p>
                        <p className="card-text text-truncate text-danger">{o.money}VND</p>
                        <p className="card-text"><small className="text-muted"></small></p>
                    </div>
                </div>
            )}
        </div>
    </>
}
export default ProductNew