import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
    const {user} = useAuth0();

    return(
        <div>
            HomePage {user?.email}
        </div>
    )
}

export default HomePage;
