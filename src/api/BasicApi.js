const base = 'http://54.179.82.237/api/v1/basic'
const BasicApi = {
    login: () => {
        return {
            url: `${base}/auth/login`,
            method: 'POST'
        }
    },
    refreshToken: () => {
        return {
            url: `${base}/auth/refresh-token`,
            method: 'PATCH'
        }
    },
    register: () => {
        return {
            url: `${base}/auth/register`,
            method: 'POST'
        }
    },
    getCategoryById: (id) => {
        return {
            url: `${base}/category/${id}`,
            method: 'GET'
        }
    },
    getAllCategory: (params) => {
        return {
            url: `${base}/category?${params}`,
            method: 'GET'
        }
    },
    getProductById: (id) => {
        return {
            url: `${base}/product/${id}`,
            method: 'GET'
        }
    },
    searchProduct: (params) => {
        return {
            url: `${base}/product?${params}`,
            method: 'GET'
        }
    }
}
export default BasicApi

// fetch("http://localhost:3000/api/v1/users", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//
//     },
//     body: JSON.stringify({user})
// })
//     .then(resp => resp.json())
//     .then(data => {
//         if (data.message) {
//         } else {
//             localStorage.setItem("token", data.jwt)
//             dispatch(loginUser(data.user))
//         }
//     })