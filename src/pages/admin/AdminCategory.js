import AdminHeader from "../../components/admin/AdminHeader";
import {useEffect, useState} from "react";
import BasicApi from "../../api/BasicApi";
import jwt_decode from "jwt-decode";
import Domain from "../../api/Domain";

const AdminCategory = () => {

    const [category, setCategory] = useState({message: null, success: null, data: []})

    const check_arr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'ROLE_ADMIN') {
                return true
            }
        }
        return false
    }

    if (localStorage.getItem('accessToken') == null) {
        window.location = Domain + '/login'
    } else {
        if (!check_arr(jwt_decode(localStorage.getItem('accessToken')))) {
            window.location = Domain + '/login'
        }
    }

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }, []);

    return <>
        <AdminHeader/>
        <main style={{marginTop: 120}}>
            {category.data.map(o =>
                <ul key={o.id} style={{lineHeight: 2}}>
                    <li>{o.name}</li>
                    {o.categories1.map(oo =>
                        <ul key={oo.id}>
                            <li>{oo.name}</li>
                            {oo.categories2.map(ooo =>
                                <ul key={ooo.id}>
                                    <li>{ooo.name}</li>
                                </ul>
                            )}
                        </ul>
                    )}
                </ul>
            )}
        </main>
    </>
}
export default AdminCategory