import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    newpassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    newpassword: false
  });
  const navigate = useNavigate()

  const [passwordMismatch, setPasswordMismatch] = useState(false);

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

    if (user.password !== user.newpassword) {
   
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    axios.post('http://localhost:3001/register', user)
      .then(result => console.log(result))
      .catch(err => console.log(err));
      navigate("/Login")
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${formErrors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={user.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <div className="alert alert-danger">Name is required</div>}
          </div>
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
          <div className={`mb-3 ${formErrors.newpassword ? 'has-error' : ''}`}>
            <label htmlFor="newpassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password again"
              name="newpassword"
              className="form-control rounded-0"
              value={user.newpassword}
              onChange={handleInputChange}
            />
            {formErrors.newpassword && <div className="alert alert-danger">Confirm Password is required</div>}
          </div>
          {passwordMismatch && <div className="alert alert-danger">Passwords do not match</div>}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>Already Have an account</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
