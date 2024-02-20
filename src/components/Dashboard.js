import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

        const [userData, setUserData] = useState(null);
      
        useEffect(() => {
          const userLoginData = localStorage.getItem("user");
          if (userLoginData) {
            setUserData(JSON.parse(userLoginData)[0]); 
          }
        }, []);

    const navigate = useNavigate();



const userlogout = () => {
    localStorage.removeItem("user")
    navigate("/");
}


// return (
//     <>
//     <h1>Dashboard Page</h1>
//     <h2>Welcome, {userData.name}!</h2>
//     </>
//   );

  return (
    <>
      <h1 style={{color:"Blue"}}>Dashboard Page</h1>
      {userData ? (
        <h2>Welcome, {userData.name}!</h2>
      ) : (
        <h6>Please Login to Acess the Dashboard!!</h6>
      )}
      {/* ... */}
      <Button onClick={userlogout}>Log Out</Button>
    </>
  );

}

export default Dashboard






