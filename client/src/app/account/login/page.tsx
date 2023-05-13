'use client';

import { useState } from "react";




export default function Login(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                ...formData
            }),
        })
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(
            {
                ...formData, [name]: value
            }
        );
    };

    return (
        <>
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit}>
                    <div>
                         <div>
                            <input onChange={onChange} name="username" id="username" />
                        </div>
                        <div>
                            <input onChange={onChange} type="password" name="password" id="password"/>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
        </>
    )
}
