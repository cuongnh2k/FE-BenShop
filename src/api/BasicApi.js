import axiosClient from './axiosClient'

const basicApi = {
    getAll: () => axiosClient.get('user/ReadAccount.php')
}

export default basicApi