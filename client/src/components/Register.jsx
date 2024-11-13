// src/components/Register.js
import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const {
    setUsername, setEmail, setPassword, setUsertype, usertype,
    setRestaurantAddress, setRestaurantImage, register,
  } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    console.log("Registration data:", {
      username: e.target.username?.value,
      email: e.target.email?.value,
      usertype: e.target.usertype?.value,
      password: e.target.password?.value,
      restaurantAddress: e.target.restaurantAddress?.value,
      restaurantImage: e.target.restaurantImage?.value,
    });
    
    try {
      await register();
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="username">Username</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="email">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="password">Password</label>
      </div>
      <select className="form-select form-select-lg mb-3" aria-label="User type" onChange={(e) => setUsertype(e.target.value)} required>
        <option value="">User type</option>
        <option value="admin">Admin</option>
        <option value="restaurant">Restaurant</option>
        <option value="customer">Customer</option>
      </select>

      {usertype === 'restaurant' && (
        <>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="restaurantAddress" placeholder="Address" onChange={(e) => setRestaurantAddress(e.target.value)} />
            <label htmlFor="restaurantAddress">Address</label>
          </div>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="restaurantImage" placeholder="Image URL" onChange={(e) => setRestaurantImage(e.target.value)} />
            <label htmlFor="restaurantImage">Thumbnail Image</label>
          </div>
        </>
      )}
      
      <button type="submit" className="btn btn-primary">Sign up</button>
      <p>Already registered? <span onClick={() => setIsLogin(true)}>Login</span></p>
    </form>
  );
};

export default Register;
