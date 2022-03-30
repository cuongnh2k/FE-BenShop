import {Link} from "react-router-dom";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import {useEffect, useState} from "react";

const PurchaseOrder = () => {
document.title="Đơn mua"
    const [status, setStatus] = useState('status=PENDING')
    const [data, setData] = useState({message: null, success: null, data: {content: []}})
    const [page, setPage] = useState(0)
    let pages = []

    if (localStorage.getItem('accessToken') == null) {
        window.location = Domain + "/login"
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            fetch(UserApi.searchOrder(`${status}&size=5&page=${page}`).url, {
                method: UserApi.searchOrder(status).method,
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
                                            PurchaseOrder()
                                        }
                                    })
                            }
                        } else {
                            setData(o)
                        }
                    }
                )
        }, [status, page]);
        for (let i = 0; i < data.data.totalPages; i++) {
            pages.push(i)
        }
    }
    return <main style={{marginTop: 120}}>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/Đơn mua
        </p>
        <label htmlFor="cars">Trạng thái:</label>
        <select onChange={e => setStatus(e.target.value)} id="cars">
            <option value="status=PENDING">Chờ xác nhận</option>
            <option value="status=RESOLVED">Đã xác nhận</option>
            <option value="status=COMPLETED">Giao thành công</option>
            <option value="status=CANCELED">Đã hủy</option>
        </select>
        {data.data.content.map(o =>
            <ul key={o.id}>
                <hr/>
                <li className="text-primary" data-toggle="modal" data-target={`#OrderDetail${o.id}`}>Chi tiết</li>

                <div className="modal fade" id={`OrderDetail${o.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"
                                    id="exampleModalLabel">Tổng: {o.orderDetails.map(i=>i.money).reduce((a, b) => a + b, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {o.orderDetails.map(oo =>
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
                                                    <ul>
                                                        {oo.orderDetailNotes.map(ooo =>
                                                            <li key={ooo.id}>Tạo bởi {ooo.createdBy}: {ooo.content}</li>
                                                        )}
                                                    </ul>
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

                <li>Mã đơn hàng: {o.id}</li>
                <li>Trạng
                    thái: {(o.status === 'PENDING') ? 'Chờ xác nhận' : (o.status === 'RESOLVED' ? 'Đã xác nhận' : (o.status === 'COMPLETED' ? 'Giao thành công' : 'Đã hủy'))}</li>
                <li>Ngày cập nhật: {new Date(o.updatedDate).toLocaleString()}</li>
            </ul>
        )}
        <div style={{width: 350, margin: "20px auto 0 auto"}}>
            {pages.map(o =>
                <input className="btn border border-success page__hover" key={o} type="button" value={o}
                       onClick={(e) => setPage(e.target.value)}/>)}
        </div>
    </main>
}
export default PurchaseOrder