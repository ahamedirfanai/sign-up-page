import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasError = false;

    for (const field in user) {
      if (!user[field]) {
        errors[field] = true;
        hasError = true;
      } else {
        errors[field] = false;
      }
    }

    setFormErrors(errors);

    if (hasError) {
      return;
    }

    axios.post('http://localhost:3001/login', user)
      .then(result => {
        console.log(result);
        if (result.data === "success") {
          navigate("/dashboard");
        } else {
          setLoginError("Username or password is incorrect");
        }
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${formErrors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={user.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <div className="alert alert-danger">Email is required</div>}
          </div>
          <div className={`mb-3 ${formErrors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              className="form-control rounded-0"
              value={user.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <div className="alert alert-danger">Password is required</div>}
          </div>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log In
          </button>
          <p>Don't have an account?</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
