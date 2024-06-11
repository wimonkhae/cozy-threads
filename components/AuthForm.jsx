"use client";
import Image from 'next/image';
import { useState } from 'react';

const AuthForm = ({ toggleForm }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        method: isSignup ? 'POST' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Handle successful sign-up or login
        const res = await response.json()
        // console.log('User created in DB!', res); 
  
        const custId = res.user.cusId
        localStorage.setItem("userId", res.user)
        localStorage.setItem("cusId", custId)
        localStorage.setItem("userId", res.user._id)
        localStorage.setItem("user_name", name)
        localStorage.setItem("user", JSON.stringify(res.user))
        
        // Redirect to the /account URL
        if(custId){
         window.location.href = `/account/${custId}`;
        }  

      } else {
        // Handle error
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='login'>

      <div className="flex w-16 my-4">
          <label className='pr-10 font-bold' htmlFor="email">Name:</label>
          <input
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="name"
            id="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-16 my-4">
          <label className='pr-10 font-bold' htmlFor="email">Email:</label>
          <input
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="email"
            id="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex w-16 my-1">
          <label className='pr-2 font-bold' htmlFor="password">Password:</label>
          <input  
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
        </div> 
        <p className='text-sm italic text-gray-400'>**password is not evaluated**</p>
        <button 
            className="bg_color hover:bg-lime-950 text-white font-bold mt-4 py-2 px-4 rounded-[10px] transition-colors duration-300"
            type="submit">
                Enter
        </button>

        </div>
      </form>

      <div className='login'>
      <button className="margin-auto mt-4"
      onClick={toggleForm}>
        {isSignup ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
      </button>
      <div className="border-b border-gray-300 my-4 max-w-96"></div>

      </div>

    </div>
  );
};

export default AuthForm;