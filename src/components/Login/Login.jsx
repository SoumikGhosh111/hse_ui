import React, {useState} from 'react'; 
import "./Login.css"; 
import { useNavigate } from 'react-router-dom';

import { baseUrl } from '../../utils/baseUrl';

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Login Details:", { email, password });
    try{ 
        const response = await fetch(`${baseUrl}/api/users/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ 
                email: email, 
                password: password
            }) 
        }); 

        
        const result = await response.json(); 
        console.log(result)
        localStorage.setItem('token', result.token);
        navigate('/admin/dashboard');
       
    }catch(e){ 
        console.log(e.message); 
    }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;