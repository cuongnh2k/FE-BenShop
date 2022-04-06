const  CommentList =(props)=>{

    return<>
        <div className="media">
            <div className="media-body">
                <p>Bình luận</p>
                <span className="mt-0">
                        {props.productComment.data.name}
                    </span>
                <span>{props.productComment.data.content.content}</span>

                {/*<div className="media mt-3">*/}
                {/*    <a className="mr-3" href="#">*/}
                {/*    </a>*/}
                {/*    <div className="media-body">*/}
                {/*        <h5 className="mt-0">Media heading</h5>*/}
                {/*        <p>Comment2</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <p>
                </p>
            </div>
        </div>
    </>
}
export  default CommentList