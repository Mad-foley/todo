import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
    const {user, isAuthenticated} = useAuth0();

    return(
        <div className="homepage">
            <div className="content">
                Welcome!
            </div>
        </div>
    )
}

export default HomePage;
