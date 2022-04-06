import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";
import UserApi from "../api/UserApi";
import {useNotification} from "react-hook-notification";
import {useLocation} from "react-router-dom";

const AddComment = () => {
    const [content, setContent] = useState('')
    const notification = useNotification()
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
            .then((o) => setContent(o));
    }, [productId]);
    const handleComment = () => {
        if (content.length < 1) {
            notification.error({
                text: 'Bình luận không được để trống'
            })
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
                    body: JSON.stringify({content: content ,productId: productId})
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
    return <>
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
                </div>
            </div>
        </div>
    </>
}
export default AddComment