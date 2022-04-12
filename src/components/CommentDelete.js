import UserApi from "../api/UserApi";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";

const CommentDelete =(props)=>{

    const handleDeleteComment =()=>{
        fetch(UserApi.deleteProductComment(props.content.id).url, {
            method: UserApi.deleteProductComment(props.content.id).method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        })
            .then(resp => resp.json())
            .then(o => {
                    if (o.success === false) {
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
                                        handleDeleteComment();
                                    }
                                })
                        }
                    } else {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload()
                    }
                }
            )
    }
    return<>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleDeleteComment}>Xóa</button>
    </>
}
export default CommentDelete