import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import "./button.css"

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string,
    appearence: "primary" | "secondary" | "link",
    size?: "sm" | "lg"
}

const Button:FC<IButtonProps> = ({title, appearence, size, className, type = "button", ...props}) => {
    let classes = `btn 
        ${appearence === "primary" && "btn-primary"}
        ${appearence === "secondary" && "btn-secondary"}
        ${appearence === "link" && "btn-link"}
        ${size === "sm" && "btn-sm"}
        ${size === "lg" && "btn-lg"}
        ${className}
    `;

    return (
        <button className={classes} type={type} {...props}>{title}</button>
    )
}

export default Button