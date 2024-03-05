import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignImg from './SignImg';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';

const Home = () => {
    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: ""
    });

    const hashPassword = async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Error hashing password');
        }
    };

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const addData = async (e) => {
        e.preventDefault();

        const { name, email, password } = inpval;

        if (name === "") {
            toast.error('Name field is required!', { position: "top-center" });
        } else if (email === "") {
            toast.error('Email field is required', { position: "top-center" });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', { position: "top-center" });
        } else if (password === "") {
            toast.error('Password field is required', { position: "top-center" });
        } else if (password.length < 5) {
            toast.error('Password length should be greater than five', { position: "top-center" });
        } else {
            try {
                const hashedPassword = await hashPassword(password);
                console.log("Data added successfully");
                navigate("/login");
                const userObject = { name, email, hashedPassword }; // Include hashed password for reference only, don't store in localStorage

                // localStorage.setItem("password", hashedPassword); // Store only the hashed password
                // // localStorage.setItem("name", name);
                // // localStorage.setItem("email", email);
                localStorage.setItem("user", JSON.stringify(userObject)); // Store the user object as a string

            } catch (error) {
                console.error('Error hashing password:', error);
                toast.error('An error occurred while hashing the password', { position: "top-center" });
            }
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-93 p-3" style={{ width: "100%" }}>
                        <h2 className='text-center col-lg-6 mt-5 ' style={{ color: "#5C85FA" }}>Welcome Here!</h2>
                        <h6 style={{ color: "#5C8599" }}>Sign Up to our portal for more details</h6>
                        <h3 className='text-center col-lg-6' style={{ color: "rgb(67, 185, 127)" }}>Sign Up</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6 mt-4" controlId="formBasicName">
                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "#0F1035" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span><NavLink to="/login">SignIn</NavLink></span> </p>
                    </div>
                    <SignImg />
                </section>
                <ToastContainer />
            </div>
        </>
    );
}

export default Home;















































































































// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import SignImg from './SignImg';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bcrypt from 'bcryptjs';

// const Home = () => {
//     const navigate = useNavigate();

//     const [inpval, setInpval] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const hashPassword = async (password) => {
//         try {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             return hashedPassword;
//         } catch (error) {
//             console.error('Error hashing password:', error);
//             throw new Error('Error hashing password');
//         }
//     };

//     const getdata = (e) => {
//         const { value, name } = e.target;
//         setInpval(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };



//     const addData = async (e) => {
//         e.preventDefault();

//         const { name, email, password } = inpval;

//         if (name === "") {
//             toast.error('Name field is required!', { position: "top-center" });
//         } else if (email === "") {
//             toast.error('Email field is required', { position: "top-center" });
//         } else if (!email.includes("@")) {
//             toast.error('Please enter a valid email address', { position: "top-center" });
//         } else if (password === "") {
//             toast.error('Password field is required', { position: "top-center" });
//         } else if (password.length < 5) {
//             toast.error('Password length should be greater than five', { position: "top-center" });
//         } else {
//             try {
//                 const hashedPassword = await hashPassword(password);
//                 console.log("Data added successfully");
//                 navigate("/login");
//                 const userObject = { name, email, hashedPassword }; // Include hashed password for reference only, don't store in localStorage

//                 // localStorage.setItem("password", hashedPassword); // Store only the hashed password
//                 // // localStorage.setItem("name", name);
//                 // // localStorage.setItem("email", email);
//                 localStorage.setItem("user", JSON.stringify(userObject)); // Store the user object as a string

//             } catch (error) {
//                 console.error('Error hashing password:', error);
//                 toast.error('An error occurred while hashing the password', { position: "top-center" });
//             }
//         }
//     };

//     return (
//         <>
//             <div className="container mt-3">
//                 <section className='d-flex justify-content-between'>
//                     <div className="left_data mt-93 p-3" style={{ width: "100%" }}>
//                         <h2 className='text-center col-lg-6 mt-5 ' style={{ color: "#5C85FA" }}>Welcome Here!</h2>
//                         <h6 style={{ color: "#5C8599" }}>Sign Up to our portal for more details</h6>
//                         <h3 className='text-center col-lg-6' style={{ color: "rgb(67, 185, 127)" }}>Sign Up</h3>
//                         <Form>
//                             <Form.Group className="mb-3 col-lg-6 mt-4" controlId="formBasicName">
//                                 <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
//                             </Form.Group>
//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                                 <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
//                             </Form.Group>
//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
//                                 <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
//                             </Form.Group>
//                             <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "#0F1035" }} type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                         <p className='mt-3'>Already Have an Account <span><NavLink to="/login">SignIn</NavLink></span> </p>
//                     </div>
//                     <SignImg />
//                 </section>
//                 <ToastContainer />
//             </div>
//         </>
//     );
// }

// export default Home;
























// import React, { useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import SignImg from './SignImg'
// import { NavLink } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const Home = () => {

//     const navigate = useNavigate();

//     const [inpval, setInpval] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })

   

//     const [data,setData] = useState([]);
//     console.log(inpval);

//     const getdata = (e) => {
//         // console.log(e.target.value);


//         const { value, name } = e.target;
//         // console.log(value,name);


//         setInpval(() => {
//             return {
//                 ...inpval,
//                 [name]: value
//             }
//         })

//     }

//     const addData = (e) => {
//         e.preventDefault();

//         const { name, email, password } = inpval;

//         if (name === "") {
//             toast.error(' name field is requred!',{
//                 position: "top-center",
//             });
//         } else if (email === "") {
//              toast.error('email field is requred',{
//                 position: "top-center",
//             });
//         } else if (!email.includes("@")) {
//              toast.error('plz enter valid email addres',{
//                 position: "top-center",
//             });
       
//         } else if (password === "") {
//              toast.error('password field is requred',{
//                 position: "top-center",
//             });
//         } else if (password.length < 5) {
//              toast.error('password length greater five',{
//                 position: "top-center",
//             });
//         } else {
//             console.log("Data added succesfully");
//             navigate("/login")
//             localStorage.setItem("user",JSON.stringify([...data,inpval]));

//         }

//     }

//     return (
//     <>
//             <div className="container mt-3">
//                 <section className='d-flex justify-content-between'>
//                     <div className="left_data mt-93 p-3" style={{ width: "100%" }}>
//                     <h2 className='text-center col-lg-6 mt-5 ' style={{color:"#5C85FA"}}>Welcome Here!</h2>
//                     <h6 style={{color:"#5C8599"}}>Sign Up to our portal for more details</h6>
//                     <h3 className='text-center col-lg-6' style={{color:"rgb(67, 185, 127)"}}>Sign Up</h3>

//                         <Form >
//                             <Form.Group className="mb-3 col-lg-6 mt-4" controlId="formBasicName">

//                                 <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
//                             </Form.Group>
//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

//                                 <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
//                             </Form.Group>

                            

//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

//                                 <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
//                             </Form.Group>
//                             <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "#0F1035" }} type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                         <p className='mt-3'>Already Have an Account <span><NavLink to="/login">SignIn</NavLink></span> </p>
//                     </div>
//                     <SignImg />
//                 </section>
//                 <ToastContainer />
//             </div>
//         </>
//     )
// }

// export default Home