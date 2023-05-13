import LoginButton from "../app/api/auth/Login"
import LogoutButton from "../app/api/auth/Logout"
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { isAuthenticated } = useAuth0();
    return (
        <nav>
            {
                isAuthenticated ?
                <LogoutButton/>
                :
                 <LoginButton/>
            }

        </nav>
    )
}
