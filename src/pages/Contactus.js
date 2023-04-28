import React, { useState } from 'react';
import hero from '../../src/assests/images/contactus.jpg';
import { Spin, Alert } from 'antd';
import { MDBInput, MDBBtn, MDBTypography, MDBTextArea } from 'mdb-react-ui-kit';
import axios from 'axios';
export default function Contactus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = JSON.stringify({
      data: {
        name,
        email,
        message,
      },
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:1337/api/contact-uses',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return alert("Your Message Sent Successfully !");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <div className='hero'>
        <div className='heromain'>
          <div className='lefthero'>
            {error ? (
              <Alert
                className='alert_error'
                message={error}
                type='error'
                closable
                afterClose={() => setError('')}
              />
            ) : null}
            <form>
              <MDBTypography tag='h2' className='formtitle page-title'>
                CONTACT US
              </MDBTypography>
              <br />
              <MDBInput
                wrapperClass='mb-4'
                label='Full Name'
                id='name'
                type='text'
                value={name}
                onChange={handleNameChange}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Email Id'
                id='email'
                type='email'
                value={email}
                onChange={handleEmailChange}
              />
              <MDBTextArea
                wrapperClass='mb-4'
                label='Message'
                id='message'
                type='text'
                value={message}
                onChange={handleMessageChange}
              />

              <MDBBtn
                className='mb-4 MDBBtn submitbtn'
                onClick={handleContactForm}
              >
                SEND &nbsp; {isLoading && <Spin size='small' />}
              </MDBBtn>
            </form>
          </div>
          <div className='righthero'>
            <img src={hero} className='heroimg' alt="React Logo" />
          </div>
        </div>
      </div>
    </>
  )
}
