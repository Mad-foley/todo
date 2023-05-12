import { useState } from "react"


export default function Login(){
    const[formData, setFormData] = useState({});

    const onSubmit = async(e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/auth/login'{
            method: 'POST',
            credentials: 'include',
        });
        if(!res.ok) {
            throw new Error('Failed to Post Data');
        }

        return res.json();
    }

    const onChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData(
            {
                ...formData, [name]: value
            }
        );
    }

    return(
        <form>
            <div className="flex flex-col gap-1 items-end">
            <div>
                <input onChange={onChange} name="username" id="username"/>
            </div>
            <div>
                <input onChange={onChange} type="password" name="password" id="password"/>
            </div>
            <div>
                <button onClick={onSubmit} className="mybutton" name="submit">Login</button>
            </div>
            </div>
        </form>
    )
}
