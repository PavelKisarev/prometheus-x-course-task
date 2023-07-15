import { FC } from "react";
import "./globalSpinner.css"

interface IGlobalSpinner {
    isShow: boolean
}

const GlobalSpinner:FC<IGlobalSpinner> = ({isShow}) => {
    return (
        <div className={`spinner-layout ${isShow ? "show" : ""}`}>
            <div className="lds-facebook">
                {isShow && <>
                    <div></div>
                    <div></div>
                    <div></div>
                </>}
            </div>
        </div>
    )
}

export default GlobalSpinner