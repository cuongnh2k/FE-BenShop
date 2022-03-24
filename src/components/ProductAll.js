import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import {useLocation} from "react-router-dom";

const ProductNew = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [page, setPage] = useState(0)

    let pages = []
    let categoryId = ''
    let location = useLocation()
    if (location.search !== '') {
        categoryId = location.search.split('=')[1]
    }

    useEffect(() => {
        fetch(BasicApi.searchProduct('size=6&categoryId=' + categoryId+ '&page=' + page).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [categoryId, page]);

    for (let i = 0; i < product.data.totalPages; i++) {
        pages.push(i)
    }

    console.log(page)

    return <>
        <p style={{marginTop: 82}} className="text-warning">Trang chủ/Sản phẩm</p>
        <div className="row">
            {product.data.content.map(o =>
                <div key={o.id} className="col-12 col-md-4 col-xl-2 col-lg-3 col-sm-6">
                    <img src={o.productImages[0].path} className="card-img-top" alt="..."/>
                    <div className="card-body card">
                        <h5 className="card-title text-truncate">{o.name}</h5>
                        <p className="card-text text-truncate text-secondary">
                            <del>{o.price}</del>
                            VND
                        </p>
                        <p className="card-text text-truncate text-danger">{o.money} VND</p>
                        <p className="card-text"><small className="text-muted"></small></p>
                    </div>
                </div>
            )}
        </div>
        <div style={{width: 350, margin: "20px auto 0 auto"}}>
            {pages.map(o =>
                <input key={0} type="button" value={o} onClick={(e) => setPage(e.target.value)}/>)}
        </div>
    </>
}
export default ProductNew