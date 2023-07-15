import { Link } from "react-router-dom"

const NotFoundPage = () => {
    
    return <>
        <div className="not-found-alert-block">Sorry, the page you were looking for was not found</div>
        <div className="not-found-alert-block"><Link className="link" to={"/books"}>Return to book catalogue</Link></div>
    </>
}

export default NotFoundPage