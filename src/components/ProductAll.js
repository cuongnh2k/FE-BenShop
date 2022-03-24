import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import {useLocation} from "react-router-dom";

const ProductNew = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [filterPriceMax, setFilterPriceMax] = useState(10000000)
    const [filterPriceMin, setFilterPriceMin] = useState(0)
    const [arrowPrice, setArrowPrice] = useState('price:asc')
    const [arrowDate, setArrowDate] = useState('id:desc')

    let pages = []
    let categoryId = ''
    let location = useLocation()
    if (location.search !== '') {
        categoryId = location.search.split('=')[1]
    }

    useEffect(() => {
        fetch(BasicApi.searchProduct(
            'size=6&categoryId=' + categoryId
            + '&page=' + page
            + '&search=' + search
            + '&priceMax=' + filterPriceMax
            + '&priceMin=' + filterPriceMin
            + '&sort=' + arrowPrice + ',' + arrowDate).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [categoryId, page, search, filterPriceMax, filterPriceMin, arrowPrice, arrowDate]);

    for (let i = 0; i < product.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <input style={{float: "right"}} type="text" onChange={e => setSearch(e.target.value)}/>
        <p style={{marginTop: 100}} className="text-warning">Trang chủ/Sản phẩm</p>
        <div className="row">
            <div className="col-md-3">

                <label htmlFor="customRange1">Giá cao nhất</label>
                <input type="range" className="custom-range" min="0" max="10000000" step="100000" id="customRange1"
                       onChange={e => setFilterPriceMax(e.target.value)}/><sup
                style={{float: "right"}}>{filterPriceMax} VND</sup>
                <label htmlFor="customRange2">Giá thấp nhất</label>
                <input type="range" className="custom-range" min="0" max="10000000" step="100000" id="customRange2"
                       onChange={e => setFilterPriceMin(e.target.value)}/><sup
                style={{float: "right"}}>{filterPriceMin} VND</sup>

                <label style={{marginTop: 10}}>Giá</label>
                <input style={{marginLeft: 20}} type="radio" name="szGia" value="price:asc"
                       onChange={e => setArrowPrice(e.target.value)}/>
                <i className="bi bi-arrow-up"></i>
                <input style={{marginLeft: 20}} type="radio" name="szGia" value="price:desc"
                       onChange={e => setArrowPrice(e.target.value)}/>
                <i className="bi bi-arrow-down"></i><br/>

                <label style={{marginTop: 10}}>Ngày cập nhật</label>
                <input style={{marginLeft: 20}} type="radio" name="szNgayCN" value="id:asc"
                       onChange={e => setArrowDate(e.target.value)}/>
                <i className="bi bi-arrow-up"></i>
                <input style={{marginLeft: 20}} type="radio" name="szNgayCN" value="id:desc"
                       onChange={e => setArrowDate(e.target.value)}/>
                <i className="bi bi-arrow-down"></i>

            </div>
            <div className="col-md-9">
                <div className="row">
                    {product.data.content.map(o =>
                        <div key={o.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
                        <input key={o} type="button" value={o} onClick={(e) => setPage(e.target.value)}/>)}
                </div>
            </div>
        </div>
    </>
}
export default ProductNew