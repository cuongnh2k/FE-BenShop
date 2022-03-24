import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";

const Slide = () => {

    const [product, setProduct] = useState({message: null, success: null, data: {content: []}})

    useEffect(() => {
        fetch(BasicApi.searchProduct('sort=discount:desc&size=6').url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, []);

    return <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" style={{marginTop: 82}}>
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" style={{maxHeight: 500}}>
            {product.data.content.filter((o, i) => i === 0).map((o) =>
                <div key={o.id} className="carousel-item active">
                    <img style={{maxHeight: 500, width: "auto"}}
                         src={o.productImages[0].path} className="d-block w-100"
                         alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <p style={{fontSize: "400%", fontWeight: "bold"}}
                           className="text-danger text-left">Giảm {o.discount}%</p>
                        <p style={{fontSize: "200%", fontWeight: "bold"}}>{o.name}</p>
                    </div>
                </div>
            )}
            {product.data.content.filter((o, i) => i !== 0).map((o) =>
                <div key={o.id} className="carousel-item">
                    <img style={{maxHeight: 500, width: "auto"}}
                         src={o.productImages[0].path} className="d-block w-100"
                         alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <p style={{fontSize: "400%", fontWeight: "bold"}}
                           className="text-danger text-left">Giảm {o.discount}%</p>
                        <p style={{fontSize: "200%", fontWeight: "bold"}}>{o.name}</p>
                    </div>
                </div>
            )}
        </div>
        <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions"
                data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions"
                data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </button>
    </div>
}
export default Slide