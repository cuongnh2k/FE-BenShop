import UserApi from "../api/UserApi";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";
import {useNotification} from "react-hook-notification";
import {useState} from "react";

const CommentEdit=(props)=>{

    const [content, setContent] = useState(props.content.content)
    const notification = useNotification()

    const  handleComment = () =>{
        if (content.length < 1) {
            notification.error({
                text: 'Bình luận không được để trống'
            })
        } else if (content.length >= 1) {

            if (localStorage.getItem('accessToken') == null) {
                window.location = Domain + "/login"
            } else {
                fetch(UserApi.editProductComment(props.content.id).url, {
                    method: UserApi.editProductComment(props.content.id).method,
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
                                                    CommentEdit(props);
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
    return<>
        <button aria-expanded="false" className="btn btn-outline-danger"
                data-toggle="collapse" data-target="#boxnoidung" style={{height:30}}>Sửa
        </button>
        <div className="collapse mt-4" id="boxnoidung">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
                <div className="coment-bottom bg-white p-2 px-4">
                    <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                        <input  type="text"  className="form-control " style={{width:200}} value={content} onChange={e => setContent(e.target.value)} />
                        <button className="btn btn-primary" type="button"  onClick={handleComment} ><i className="bi bi-send"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default CommentEdit