import "./footer.css"

const Footer = () => {
    return <>
        <footer className="footer">
            <div className="container">
                <p className="d-flex justify-content-center">Made by Pasha Kisarev</p>
                <p className="d-flex justify-content-center">Виконано в&nbsp;<a className="link" href="https://prometheus.org.ua/" target="_blank" rel="noreferrer">Prometheus</a>&nbsp;© {new Date().getFullYear()}</p>
            </div>
        </footer>
    </>
}

export default Footer