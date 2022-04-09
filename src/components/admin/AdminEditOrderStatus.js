import EditOrderDetailNote from "../EditOrderDetailNote";
import {useEffect, useState} from "react";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";

const AdminEditOrderStatus = (props) => {

    const [status, setStatus] = useState(props.order.status)
    console.log(status)

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            fetch(AdminApi.editOrderStatus(props.order.id).url, {
                method: AdminApi.editOrderStatus(props.order.id).method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({status: status})
            })
                .then(resp => resp.json())
                .then(o => {
                        console.log(o.message)
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
                                                localStorage.setItem('accessToken', oo.data.accessToken)
                                                localStorage.setItem('refreshToken', oo.data.refreshToken)
                                                AdminEditOrderStatus(props)
                                            }
                                        })
                                }
                            } else {
                                setStatus(props.order.status)
                            }
                        }
                    }
                )
        } else {
            setStatus(props.order.status)
        }
    }, [props, status]);

    return <>
        <span className="text-primary" data-toggle="modal"
              data-target={`#chiTietOrder${props.order.id}`}>Chi tiết</span>

        <div className="modal fade" id={`chiTietOrder${props.order.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Tổng: {props.order.orderDetails.map(i => i.money).reduce((a, b) => a + b, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                            <select className="form-control" style={{maxWidth: 300, margin: "10px 0"}}
                                    onChange={e =>
                                        setStatus(e.target.value === 'Chờ xử lý' ? 'PENDING' : (e.target.value === 'Đã xử lý' ? 'RESOLVED' : (e.target.value === 'Giao thành công' ? 'COMPLETED' : 'CANCELED')))
                                    }>
                                <option defaultValue="PENDING" selected={status === 'PENDING'}>
                                    Chờ xử lý
                                </option>
                                <option defaultValue="RESOLVED" selected={status === 'RESOLVED'}>
                                    Đã xử lý
                                </option>
                                <option defaultValue="COMPLETED" selected={status === 'COMPLETED'}>
                                    Giao thành công
                                </option>
                                <option defaultValue="CANCELED" selected={status === 'CANCELED'}>
                                    Hủy bỏ
                                </option>
                            </select>
                            Mã đơn hàng: {props.order.id}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.order.orderDetails.map(oo =>
                            <div key={oo.id} className="row text-secondary" style={{marginTop: 5}}>
                                <div className="col-sm-2">
                                    <a href={`/product-detail?id=${oo.product.id}`}>
                                        <img className="img-fluid" style={{maxHeight: 200, borderRadius: 5}}
                                             src={oo.product.productImages[0].path} alt=""/>
                                    </a>
                                </div>
                                <div className="col-sm-10" style={{padding: 0, margin: 0}}>
                                    <ul>
                                        <li>Mã sản phẩm: {oo.product.id}</li>
                                        <li>Tên: {oo.product.name}</li>
                                        <li>Số lượng: {oo.quantity}</li>
                                        <li>Giá: {oo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</li>
                                        <li>Giảm giá: {oo.discount}%</li>
                                        <li>Thành
                                            tiền: {oo.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                        </li>
                                        <li>Yêu cầu:
                                            {oo.orderDetailNotes.map(ooo =>
                                                <ul key={ooo.id}>
                                                    <li>Người tạo: {ooo.createdBy}</li>
                                                    <li>
                                                        <EditOrderDetailNote orderDetailNote={ooo}/>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12">
                                    <hr/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminEditOrderStatus