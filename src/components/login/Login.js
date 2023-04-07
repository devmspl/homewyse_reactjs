import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import btnleftarrow from "../../assets/back-icon-arrow.svg";
import { BASE_URL } from "../../API";
import * as Yup from "yup";
// import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/AuthContext";



const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const { setAuth } = React.useContext(AuthContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setIsLoading(true);
      if (values) {
        return new Promise((resolve, reject) => {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          };
          fetch(`${BASE_URL}/api/users/login`, options)
  .then((d) => d.json())
  .then((response) => {
    localStorage.setItem("login", JSON.stringify(response));
    if (response.statusCode === 200) {
      localStorage.setItem("user", JSON.stringify(response));
       setAuth(response.data)
      toast('User Login Successfully!');
      console.log(response);
      navigate("/dashboard");
    } else {
      reject(new Error("wrong"));
    }
  })
  .catch((err) => {
    reject(err);
  });
         });
      } else {
        toast.warn("Fill the email and Password")
        formik.setFieldError(
          "loginPassword",
          "email and password do not match."
        );
        setIsLoading(false);
      }
    },
  });

  
  return (
    <div className='body-mobile-info'>
      <div className='mb-30px'>
        <button className='back-top-btn'>
          <img src={btnleftarrow} onClick={() => navigate("/")} />
        </button>
        <h1>Log In</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='signup-form-info'>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-control'
              id='email'
              name='email'
              type='email'
              placeholder='Your Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-control'
              id='password'
              name='password'
              type='password'
              placeholder='Your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='btn-links pl-20px pr-20px mb-3'>
            <Link to='#'>Forgot Password?</Link>
          </div>
        </div>
        <div className='bottom-btn-info'>
          <div className='btn-links text-align-center mb-3'>
            <Link to='/signup'>Create Account</Link>
          </div>
          <div className='bg-blue-clr'>
            <button className='btn-cstm' type='submit'>
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
