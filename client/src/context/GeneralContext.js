import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');

  const [productSearch, setProductSearch] = useState('');

  const [cartCount, setCartCount] = useState(0);


  useEffect(()=>{
    fetchCartCount();
  }, [])

  const fetchCartCount = async() =>{
    const userId = localStorage.getItem('userId');
    if(userId){
      await axios.get('http://localhost:6001/fetch-cart').then(
        (response)=>{
          setCartCount(response.data.filter(item=> item.userId === userId).length);
        }
      )
    }
  }



  const handleSearch = () =>{
    navigate('#products-body')
  }


  
  
  
  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{

          localStorage.setItem('userId', res.data._id);
            localStorage.setItem('userType', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'customer'){
                navigate('/');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            } else if(res.data.usertype === 'restaurant'){
                navigate('/restaurant');
            }
          }).catch((err) =>{
            alert("login failed!!");
            console.log(err);
          });
          
        }catch(err){
          console.log(err);
        }
      }
      
  const inputs = {username, email, usertype, password, restaurantAddress, restaurantImage};

  const register = async () => {
    try {
      console.log("Sending registration data:", inputs);  // Log the inputs for debugging
  
      const res = await axios.post('http://localhost:6001/register', inputs);
  
      // Save user details in local storage
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
  
      // Navigate based on usertype
      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'restaurant') {
        navigate('/restaurant');
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed! Please check your input.");
    }
  };


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, setRestaurantAddress, setRestaurantImage, productSearch, setProductSearch, handleSearch, cartCount, fetchCartCount}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider