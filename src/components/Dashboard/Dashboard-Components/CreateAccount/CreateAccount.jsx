import React, { useState } from "react";
import "./CreateAccount.css";
import {baseUrl} from "../../../../utils/baseUrl"; 

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "supervisor"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const token = localStorage.getItem('token'); 
    try{ 
      const response = await fetch(`${baseUrl}/api/users/create-user`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
      }, 
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password, 
          role: formData.role
        })
      }); 

      const result = await response.json(); 
      console.log(result); 
    }catch(e){ 
      console.log(e.message); 
    }
  };

  return (
    <div className="create-account-container">
      <h2 className="create-account-title">Create an Account</h2>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="create-account-field">
          <label htmlFor="name" className="create-account-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="create-account-input"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="create-account-field">
          <label htmlFor="email" className="create-account-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="create-account-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="create-account-field">
          <label htmlFor="password" className="create-account-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="create-account-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="create-account-field">
          <label htmlFor="role" className="create-account-label">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="create-account-select"
          >
            <option value="supervisor">Technical Asistant</option>
            <option value="inspector">Inspector</option>
          </select>
        </div>

        <button type="submit" className="create-account-submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
