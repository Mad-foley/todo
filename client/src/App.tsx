import Navbar from './app/components/Navbar';
import HomePage from './app/components/Home';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getPrivate = async() => {
      if(isAuthenticated){
          try {
              const response = await fetch('http://localhost:3001/user/register', {
                  method: 'POST',
                  body: JSON.stringify(user),
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
  }, [isAuthenticated])

  return (
    <div className="App">
      <Navbar />
      {
        isAuthenticated &&
        <HomePage />
      }
    </div>
  );
}

export default App;
