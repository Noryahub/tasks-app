import { accountService } from "./_services/account.service";
import { useNavigate } from "react-router-dom";


const LogoutForm = () =>{
    let navigate = useNavigate()

    const logout = ()=>{
        accountService.logout()
        navigate('/auth/login')
    }

    return (
<div className="absolute top-4 right-4">
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
            Logout
  </button>
</div>

    )
}
export default LogoutForm;