import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import jwt_decode from "jwt-decode";
import {useLocation} from "react-router-dom";
import BasicApi from "../api/BasicApi";
import CommentList from "./CommentList";


const Comment =()=>{
    const [productComment, setProductComment] = useState({message: null, success: null, data: {content: []}})

    const check_arr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'ROLE_USER') {
                return true
            }
        }
        return false
    }
    if (localStorage.getItem('accessToken') == null) {
        window.location = Domain + '/login'
    } else {
        if (!check_arr(jwt_decode(localStorage.getItem('accessToken')).roles)) {
            window.location = Domain + '/login'
        }
    }
    let productId = ''
    let location = useLocation()
    if (location.search !== '') {
        productId = location.search.split('=')[1]
    }
    useEffect(() => {
        fetch(UserApi.getCommentByProductId(productId).url)
            .then((res) => res.json())
            .then((o) => setProductComment(o));
    }, [productId]);
    return<>
        <div>
            <div className="media">
                <div className="media-body">
                    {/*<p>Bình luận</p>*/}
                    {/*<span className="mt-0">*/}
                    {/*    {productComment.data.content}*/}
                    {/*</span>*/}
                    <CommentList productComment={productComment}/>
                    {/*<div className="media mt-3">*/}
                    {/*    <a className="mr-3" href="#">*/}
                    {/*    </a>*/}
                    {/*    <div className="media-body">*/}
                    {/*        <h5 className="mt-0">Media heading</h5>*/}
                    {/*        <p>Comment2</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <p>
                    </p>
                </div>
            </div>
        </div>
    </>
}
export  default Comment