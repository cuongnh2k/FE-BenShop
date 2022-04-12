const base = 'http://54.179.82.237/api/v1/admin'
const AdminApi = {
    editCategory: (id) => {
        return {
            url: `${base}/category/${id}`,
            method: 'PATCH'
        }
    },
    addCategory: () => {
        return {
            url: `${base}/category`,
            method: 'POST'
        }
    },
    deleteCategory: (id) => {
        return {
            url: `${base}/category/${id}`,
            method: 'DELETE'
        }
    },
    editProduct: (id) => {
        return {
            url: `${base}/product/${id}`,
            method: 'PATCH'
        }
    },
    addProductImage: (id) => {
        return {
            url: `${base}/product/${id}/image`,
            method: 'POST'
        }
    },
    deleteProductImage: (id) => {
        return {
            url: `${base}/product/image/${id}`,
            method: 'DELETE'
        }
    }
}
export default AdminApi