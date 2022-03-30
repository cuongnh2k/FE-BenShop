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
    }
}
export default UserApi