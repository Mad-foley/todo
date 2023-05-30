import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";


const HomePage = () => {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [token, setToken] = useState('');
    const getPrivate = async() => {
        if(isAuthenticated){
            setToken(await getAccessTokenSilently());
            const response = await fetch('http://localhost:3001/api/public', {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token }
            });

            if(response.ok) {
                const data = await response.json()
                console.log(data)
            }
        }
    }

    return(
        <div>
            <button className="text-white" onClick={getPrivate}>TEST BUTTON</button>
            <h1>Welcome {user?.name || "user"}</h1>
        </div>
    )
}

export default HomePage;
