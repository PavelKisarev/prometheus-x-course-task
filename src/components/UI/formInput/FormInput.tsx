import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import "./formInput.css"

export interface IFormInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> {
    label?: string
}

const FormInput:FC<IFormInput> = ({label, id, className, ...props}) => {
    let classes = `form-input-base ${className}`
    return <>
        {label && <label htmlFor={id}>{label}</label>}
        <input className={classes} id={id} {...props} />
    </>
}

export default FormInput