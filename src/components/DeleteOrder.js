import UserApi from "../api/UserApi";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";

const DeleteOrder = (props) => {
    // eslint-disable-next-line no-unused-vars
    const handleDelete = () => {
        fetch(UserApi.deleteOrder(props.order.id).url, {
            method: UserApi.deleteOrder(props.order.id).method,
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
                                        handleDelete()
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
    return <span onClick={handleDelete} style={{marginLeft: 30}} className="text-danger">
                        {props.order.status === 'PENDING' ? 'Xóa' : ''}
                    </span>
}
export default DeleteOrder