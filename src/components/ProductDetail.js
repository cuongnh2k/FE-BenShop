import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";
import AddToCart from "./AddToCart";
import UserApi from "../api/UserApi";
import {useNotification} from "react-hook-notification";

const ProductDetail = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {productImages: [{path: null}]}})
    const [path, setPath] = useState('')
    const [content, setContent] = useState('')
    const notification = useNotification()
    const [productComment, setProduct_comment] =useState('')
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
    }, [productId]);

    const handleComment = () => {
        if (content.length < 1) {
            notification.error({
                text: 'Bình luận không được để trống'
            })  `1`
        } else if (content.length >= 1) {

            if (localStorage.getItem('accessToken') == null) {
                window.location = Domain + "/login"
            } else {

                fetch(UserApi.createCommentProduct(`${productId}`).url, {
                    method: UserApi.createCommentProduct().method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({content: content})
                })
                    .then(resp => resp.json())
                    .then(o => {
                            if (o.success === false) {
                                if (o.errorCode === 401) {
                                    if (localStorage.getItem('refreshToken') == null) {
                                        window.location = Domain + "/login"
                                    } else {
                                        fetch(BasicApi.refreshToken().url, {
                                            method: BasicApi.refreshToken().method,
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
                                            }
                                        })
                                            .then(resp => resp.json())
                                            .then(oo => {
                                                if (oo.success === false) {
                                                    document.location = window.location = Domain + "/login"
                                                } else {
                                                    localStorage.setItem('accessToken', JSON.stringify(oo.data.accessToken))
                                                    localStorage.setItem('refreshToken', JSON.stringify(oo.data.refreshToken))
                                                }
                                            })
                                    }
                                } else {
                                    notification.error({
                                        text: o.message
                                    })
                                }
                            } else {
                                localStorage.removeItem('storage')
                                notification.success({
                                    text: o.message
                                })
                            }
                        }
                    )
            }
        }
    }
    document.title = product.data.name

    return <>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/<Link to="/product">Sản phẩm</Link>/Chi tiết
        </p>
        <div className="row">
            <div className="col-md-6 border-right">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="row">
                            {product.data.productImages.map(o =>
                                <div key={o.id} className="col-12">
                                    <img onMouseMove={() => setPath(o.path)} className="img-fluid border"
                                         src={o.path} alt={o.name}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <img style={{maxHeight: 500}} className="img-fluid"
                             src={path || product.data.productImages[0].path}
                             alt={product.data.productImages[0].name}/>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <AddToCart product={product}/>
            </div>
            <div className="col-12 border-top">
                <h3 style={{marginTop: 20}}>Chi tiết sản phẩm</h3>
                {product.data.description || `Đang cập nhật ...`}
            </div>
        </div>

        <div className="row">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
                <h2>Bình luận</h2>
                <div className="comment mt-4 text-justify float-left display: flex justify-content: center">
                    <span>Viết bình luận</span>
                    <br/>
                    <input onChange={e => setContent(e.target.value)} type="text" id="content" className="form-control"
                           placeholder="Bình luận ...."/>
                    <button onClick={handleComment} className="btn btn-success">
                        <i className="bi bi-send"></i>
                    </button>

                    <div className="media">
                        <div className="media-body">
                            <h5 className="mt-0"></h5>
                            <p>{}</p>

                            {/*<div className="media mt-3">*/}
                            {/*    <a className="mr-3" href="#">*/}
                            {/*    </a>*/}
                            {/*    <div className="media-body">*/}
                            {/*        <h5 className="mt-0">Media heading</h5>*/}
                            {/*        <p>Comment2</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <p>
                                <div>{}</div>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
export default ProductDetail