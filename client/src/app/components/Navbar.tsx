import LoginButton from "../api/auth/Login"
import LogoutButton from "../api/auth/Logout"
import { useAuth0 } from "@auth0/auth0-react";



export default function Navbar() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <nav>
            {
                isAuthenticated ?
                <>
                    <h1>Welcome back {user?.name}</h1>
                    <LogoutButton/>
                </>

                :
                 <LoginButton/>
            }
        </nav>
    )
}
