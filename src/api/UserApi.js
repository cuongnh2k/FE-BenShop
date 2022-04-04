const base = 'http://54.179.82.237/api/v1/user'
const UserApi = {
    createOrder: () => {
        return {
            url: `${base}/order`,
            method: 'POST'
        }
    },
    searchOrder: (params) => {
        return {
            url: `${base}/order?${params}`,
            method: 'GET'
        }
    },
    editOrderDetailNote: (id) => {
        return {
            url: `${base}/order/detail/note/${id}`,
            method: 'PATCH'
        }
    },
    deleteOrder: (id) => {
        return {
            url: `${base}/order/${id}`,
            method: 'DELETE'
        }
    },
    createCommentProduct: (id) => {
        return {
            url: `${base}/product/${id}/comment`,
            method: 'POST'
        }
    },
    logouts: (params) => {
        return {
            url: `${base}/device/logouts/${params}`,
            method: 'DELETE'
        }
    },
    logout: () => {
        return {
            url: `${base}/device/logout`,
            method: 'DELETE'
        }
    }
}
export default UserApi