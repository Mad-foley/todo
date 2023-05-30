
import LoginButton from "../api/auth/Login"
import LogoutButton from "../api/auth/Logout"
import { useAuth0 } from "@auth0/auth0-react";


export default function Navbar() {
    const { isAuthenticated } = useAuth0();
    return (
        <nav className="navbar">
            {
                isAuthenticated ?
                <>
                    <LogoutButton/>
                </>

                :
                 <LoginButton/>
            }
        </nav>
    )
}
