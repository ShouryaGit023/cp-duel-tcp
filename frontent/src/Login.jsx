// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify'

// const Login = () => {
//     const [LoginInfo, setLoginInfo] = useState({
//         email: "",
//         password: ""
//     })
//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setLoginInfo(prev => ({ ...prev, [name]: value }))
//     }
//     const handlesubmit = async (e) => {
//         e.preventDefault()
//         const { email, password } = LoginInfo;
//         if (email === "" || password === "") {
//             toast.error("Please fill all the fields")
//             return
//         }
//         try {
//             const url = "http://localhost:8080/auth/login"
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(LoginInfo)
//             })
//             const data = await response.json()
//             const { message, success, error } = data
//             if (success) {
//                 toast.success(message)
//                 setTimeout(() => navigate("/"), 1000)
//             } else if (error) {
//                 const details = error?.details?.[0]?.message || error
//                 toast.error(details)
//             } else if (!success) {
//                 toast.error(message)
//             }
//         } catch (error) {
//             toast.error("Something went wrong")
//         }
//     }
//     console.log(LoginInfo);
//     return (
//         <div>
//             <form onSubmit={handlesubmit} method="post">
//                 <input type="email" value={LoginInfo.email} onChange={handleChange} name='email' placeholder='Enter email' required /><br />
//                 <input type="password" value={LoginInfo.password} onChange={handleChange} name="password" placeholder='password' required /><br />
//                 <button>Login</button>
//             </form>
//             <h3>Don't have account?<Link to={'/signup'}>SignUp</Link></h3>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Login



// import React from 'react'
// import { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { AuthContext } from './AuthContext'
// import { ToastContainer, toast } from 'react-toastify'
// // import { useConnection } from '../../backened/Models/AdminModel'

// const Login = () => {
//     const navigate = useNavigate();
//     const {token , changeToken} = useContext(AuthContext);
//     const [LoginInfo, setLoginInfo] = useState({
//         email: "",
//         password: ""
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setLoginInfo(prev => ({ ...prev, [name]: value }))
//     }

//     const handlesubmit = async (e) => {
//         e.preventDefault()
//         const { email, password } = LoginInfo;
//         if (!email || !password) {
//             toast.error("Please fill all fields");
//             return;
//         }
        
//         try {
//             const response = await fetch("http://localhost:8080/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password })
//             });
            
//             const data = await response.json();
            
//             if (!response.ok) {
//                 throw new Error(data.message || "Login failed");
//             }

//             if (data.success) {
//                 toast.success("Login successful");
//                 // Store the token in localStorage or context
//                 localStorage.setItem("token", data.jwtToken);
//                 // login(data.jwtToken);
//                 // changeToken(data.jwtToken);
//                 setTimeout(() => navigate("/home"), 1000);
//             }
            
//         } catch (error) {
//             toast.error(error.message || "Login failed. Check credentials.");
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={handlesubmit}>
//                 <input type="email" name="email" value={LoginInfo.email} 
//                        onChange={handleChange} placeholder="Email" required />
//                 <br />
//                 <input type="password" name="password" value={LoginInfo.password} 
//                        onChange={handleChange} placeholder="Password" required />
//                 <br />
//                 <button type="submit">Login</button>
//             </form>
//             <h3>Don't have an account? <Link to="/signup">Sign Up</Link></h3>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Login



import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { token, changeToken } = useContext(AuthContext);
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        toast.success("Login successful");
        localStorage.setItem("token", data.jwtToken);
        if (changeToken) changeToken(data.jwtToken);
        setTimeout(() => navigate("/home"), 1000);
      }

    } catch (error) {
      toast.error(error.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>CP DUEL</h1>
        <span className="login-header-sub">Competitive Programming Platform</span>
      </header>
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handlesubmit}>
          <input
            className="login-input"
            type="email"
            name="email"
            value={LoginInfo.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            value={LoginInfo.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;