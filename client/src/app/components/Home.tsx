import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";


const HomePage = () => {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [email, setEmail] = useState({});

    const getPrivate = async() => {
        if(isAuthenticated){
            setEmail({ email: user?.email });
            try{
                const response = await fetch('http://localhost:3001/user/register', {
                    method: 'POST',
                    body: JSON.stringify(email),
                    headers: {
                        Authorization: 'Bearer ' + await getAccessTokenSilently(),
                        'Content-Type': 'application/json'
                    }
                });
                if(response.ok){
                    console.log(await response.json());
                }
            } catch(err){
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getPrivate();
    }, [])

    return(
        <div>
            {
                isAuthenticated &&
                <button className="text-white" onClick={getPrivate}>TEST BUTTON</button>
            }

            <h1>Welcome {user?.name || "user"}</h1>
        </div>
    )
}

export default HomePage;
