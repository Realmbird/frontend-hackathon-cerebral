import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

function SignUp () {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
       e.preventDefault()
       console.log(form)
    // replace port    
       try {
        const response = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Ensure the request is sent as JSON
            },
            body: JSON.stringify({ form_data: form }), // Format the body correctly
        });

        if (response.ok) {
            const headers = response.headers;
            const authToken = headers.get('Authorization');
             // This is how you would retrieve the Authorization token
            console.log(authToken)
            // // Optionally, store the auth token in localStorage or sessionStorage
            if (authToken) {
                localStorage.setItem('authToken', authToken);
            }
            const data = await response.json();
            console.log('Success:', data);
            
            navigate("/app");
            // You can redirect the user or update the UI as needed
            setError('');
        } else {
            const errorData = await response.json();
            console.error('Failed to sign up:', response.statusText);
            // Set the error message from the server response
            setError(errorData.status.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
       
    }
    const handleChange = (e) => {
        setForm({...form, 
            [e.target.name]: e.target.value   
           })
    }

    return (
        <div className='Signup'>
            <div>
                <img src="bridge.webp" alt="logo" className='logo'/>
            </div>
            <form onSubmit={handleSubmit}>
                <label> Email: </label>
                <input placeholder = "Email" type="email" name="email" value={form.email} onChange={handleChange}/>

                <label> Name: </label>
                <input placeholder = "Name" type="text" name="name" value={form.name} onChange={handleChange}/>

                <label> Password: </label>
                <input placeholder = "Password" type="text" name="password" value={form.password} onChange={handleChange}/>

                <input type="submit" value="Submit" />
            </form>
            {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
            <Link className="form-link" to="/login">Have an account? Sign in</Link>
        </div>
    )
}
export default SignUp