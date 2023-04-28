import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
  from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import './login.css';
import { MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../authentication/context/AuthContext';
import { setToken } from '../authentication/helper';
import { message, Spin, Alert } from 'antd';
function App() {

  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  var data = new FormData();
  data.append('username', userName);
  data.append('email', email);
  data.append('password', password);


  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:1337/api/auth/local/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  const handleRegistration = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log('dataaa', data)
        if (data?.error) {
          throw data?.error;
        } else {
          // set the token
          setToken(data.jwt);

          // set the user
          setUser(data.user);

          message.success(`Welcome to E-learning ${response.data.user.username}!`);

          navigate("/login", { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error?.message ?? "Something went wrong!");
      });
    resetForm();
  };

  const resetForm = () => {
    setUserName("")
    setEmail("")
    setPassword("")
  }
  return (
    <><MDBContainer className="p-3 my-2 d-flex flex-column maincontainer">
      {error ? (
        <Alert
          className="alert_error"
          message={error}
          type="error"
          closable
          afterClose={() => setError("")} />
      ) : null}
      <form>
        <MDBTypography tag='h2' className='formtitle page-title'>REGISTRATION</MDBTypography><br />
        <MDBInput wrapperClass='mb-4' label='Name' id='username' type='text' value={userName} onChange={handleUserNameChange} rules={[{ required: true }]} />
        <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' value={email} onChange={handleEmailChange} rules={[{ required: true }]} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={handlePasswordChange} rules={[{ required: true }]} autocomplete="new-password" />

        <MDBBtn className="mb-4 MDBBtn submitbtn" type="submit" onClick={handleRegistration}>Sign up &nbsp; {isLoading && <Spin size="small" />}</MDBBtn>
      </form>
      <div className="text-center">
        <p>Allready a member? <Link to='/login' className='links'>
          Login
        </Link></p>
      </div>

    </MDBContainer><br /></>
  );
}

export default App;