import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import jwt_decode from "jwt-decode";
import {useLocation} from "react-router-dom";
import BasicApi from "../api/BasicApi";
import moment from "moment";
import UserApi from "../api/UserApi";
import {useNotification} from "react-hook-notification";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";


const Comment =()=>{
    const [productComment, setProductComment] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [page, setPage] = useState(0)
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
    let pages = []
    let productId = ''
    let location = useLocation()
    if (location.search !== '') {
        productId = location.search.split('=')[1]
    }
    useEffect(() => {
        fetch(BasicApi.getCommentByProductId(productId,`page=${page}&size=4&sort=`).url)
            .then((res) => res.json())
            .then((o) => setProductComment(o));
    }, [productId, page]);
    for (let i = 0; i < productComment.data.totalPages; i++) {
        pages.push(i)
    }

    return<>
        <div className="container">
            <div className="row">
                <div className="col-sm-5 col-md-6 col-12 pb-4" >
                        {productComment.data.content.map(o=>
                        <div key={o.id} className={"border"}>
                            <div className="comment mt-3 text-justify "style={{display: "flex"}}>
                                <h4>{o.user.firstName}&nbsp;{o.user.lastName}</h4>&nbsp;&nbsp;&nbsp;<span>{moment(o.createdDate).format("DD/MM/YYYY")}</span>
                            </div>
                            <p className={"text-success"}>{o.content}</p>
                            <div className={"item"} style={{display: "flex",flex_wrap: "wrap", flex_direction: "row"}}>
                                <p className={""}><CommentEdit content={o}/></p>
                                <p className={""}><CommentDelete content={o}/></p>
                            </div>

                        </div>
                        )}
                    </div>
                    <p>
                    </p>
                </div>

            </div>
        <div style={{width: 350, margin: "20px auto 0 auto"}}>
            {pages.map(o =>
                <input className="btn border border-success page__hover" key={o} type="button" value={o}
                       onClick={(e) => setPage(e.target.value)}/>)}
        </div>
    </>
}
export  default Comment