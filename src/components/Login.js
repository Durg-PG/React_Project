import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SignImg from "./SignImg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";

const Login = () => {
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      throw new Error("Error comparing passwords");
    }
  };

  const addData = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      toast.error("Email field is required", { position: "top-center" });
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password field is required", { position: "top-center" });
    } else {
      try {
        const userObject = JSON.parse(localStorage.getItem("user"));
        const storedHashedPassword = userObject
          ? userObject.hashedPassword
          : null;

        // Correct the condition to check if the user object exists and has a hashedPassword
        if (!userObject || !storedHashedPassword) {
          toast.error("User not found", { position: "top-center" });
          return;
        }

        const isMatch = await comparePasswords(password, storedHashedPassword);

        if (!isMatch) {
          toast.error("Invalid email or password", { position: "top-center" });
          return;
        }

        console.log("User logged in successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("An error occurred while logging in", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-6" style={{ width: "100%" }}>
            <h2
              className="text-center col-lg-6 mt-5"
              style={{ color: "#5C85FA" }}
            >
              Welcome Back!
            </h2>
            <h3
              className="text-center col-lg-6"
              style={{ color: "rgb(67, 185, 127)" }}
            >
              Sign In
            </h3>
            <Form>
              <Form.Group
                className="mb-3 col-lg-6 mt-3"
                controlId="formBasicEmail"
              >
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "#0F1035" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
          <SignImg />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;











































// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import SignImg from './SignImg';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bcrypt from 'bcryptjs';

// const Login = () => {
//     const navigate = useNavigate();

//     const [inpval, setInpval] = useState({
//         email: "",
//         password: ""
//     });

//     const getdata = (e) => {
//         const { value, name } = e.target;
//         setInpval(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const comparePasswords = async (plainPassword, hashedPassword) => {
//         try {
//             return await bcrypt.compare(plainPassword, hashedPassword);
//         } catch (error) {
//             console.error('Error comparing passwords:', error);
//             return false;
//         }
//     };

//     const addData = async (e) => {
//         e.preventDefault();

//         const { email, password } = inpval;

//         if (email === "") {
//             toast.error('Email field is required', { position: "top-center" });
//         } else if (!email.includes("@")) {
//             toast.error('Please enter a valid email address', { position: "top-center" });
//         } else if (password === "") {
//             toast.error('Password field is required', { position: "top-center" });
//         } else {
//             try {
//                 //const storedPassword = localStorage.getItem("password");
//                 const storedPassword = JSON.parse(localStorage.getItem("user"));


//                 if (!storedPassword) {
//                     toast.error('User not found', { position: "top-center" });
//                     return;
//                 }

//                 // const isMatch = await comparePasswords(password, storedPassword);
//                 const isMatch = await comparePasswords(password, storedPassword);

//                 if (!isMatch) {
//                     toast.error('Invalid email or password', { position: "top-center" });
//                     return;
//                 }

//                 console.log("User logged in successfully");
//                 navigate("/dashboard");
//             } catch (error) {
//                 console.error('Error logging in:', error);
//                 toast.error('An error occurred while logging in', { position: "top-center" });
//             }
//         }
//     };

//     return (
//         <>
//             <div className="container mt-3">
//                 <section className='d-flex justify-content-between'>
//                     <div className="left_data mt-3 p-6" style={{ width: "100%" }}>
//                         <h2 className='text-center col-lg-6 mt-5' style={{ color: "#5C85FA" }}>Welcome Back!</h2>
//                         <h3 className='text-center col-lg-6' style={{ color: "rgb(67, 185, 127)" }}>Sign In</h3>
//                         <Form>
//                             <Form.Group className="mb-3 col-lg-6 mt-3" controlId="formBasicEmail">
//                                 <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
//                             </Form.Group>
//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
//                                 <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
//                             </Form.Group>
//                             <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "#0F1035" }} type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                     </div>
//                     <SignImg />
//                 </section>
//                 <ToastContainer />
//             </div>
//         </>
//     );
// };

// export default Login;