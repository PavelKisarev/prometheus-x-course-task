import { FaUser } from "react-icons/fa"
import FormInput from "../UI/formInput/FormInput"
import Button from "../UI/button/Button"
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
import "./loginForm.css"

const LoginForm = () => {
    let {logIn} = useContext(UserContext);
    let navigate = useNavigate();

    let [userName, setUserName] = useState('');

    const userNameHandler = (event:any) => {
        setUserName(event.target.value)
    }

    const checkIsSignInDisabled = () => userName.length > 4 && userName.length < 16 ? false : true;

    const logInUser = () => {
        logIn(userName)
        navigate("/books")
    }
    return <>
        <div className="neumorph-block login-block">
          <form className="form" action="">
            <div className="form-row form-center">
              <FaUser className="login-form-icon" />
            </div>
            <div className="form-row form-center">
              <FormInput type="text" name="login" id="login" label="Login" value={userName} onChange={userNameHandler} />
            </div>
            <div className="form-row">
              <Button appearence="primary" title="SignIn" disabled={checkIsSignInDisabled()} onClick={logInUser} />
            </div>
          </form>
        </div>
    </>
}

export default LoginForm