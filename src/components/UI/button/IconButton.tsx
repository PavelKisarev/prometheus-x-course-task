import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import "./button.css"

interface IIconButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    rounded?: boolean
}

const IconButton:FC<IIconButtonProps> = ({children, className, type = "button", rounded = false, ...props}) => {

    let classes = `btn-icon
        ${rounded && "btn-rounded"}
        ${className}
    `;

    return (
        <button className={classes} type={type} {...props}>{children}</button>
    )
}

export default IconButton