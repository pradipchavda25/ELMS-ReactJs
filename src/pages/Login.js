import {
  Alert,
  Form,
  message,
  Spin,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authentication/context/AuthContext";
import { API } from "../authentication/constant";
import { setToken } from "../authentication/helper";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBTypography
}
  from 'mdb-react-ui-kit';
const SignIn = () => {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment className="maincontainer">
      <MDBContainer className="p-3 my-2 d-flex flex-column maincontainer">
        {error ? (
          <Alert
            className="alert_error"
            message={error}
            type="error"
            closable
            afterClose={() => setError("")}
          />
        ) : null}
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <MDBTypography tag='h2' className='formtitle page-title'>LOGIN</MDBTypography><br />

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <MDBInput wrapperClass='mb-4' name="password" label='UserName' id='username' type='text' />

          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true }]}
          >
            <MDBInput wrapperClass='mb-4' autoComplete="off" label='Password' id='password' type='password' />
          </Form.Item>

          <Form.Item>
            <MDBBtn
              type="primary"
              htmlType="submit"
              className="login_submit_btn MDBBtn submitbtn"

            >
              Login &nbsp; {isLoading && <Spin size="small" />}
            </MDBBtn>
          </Form.Item>
        </Form>
        <div className="text-center">
          <p>New User ? <Link to='/register' className='links'>
            Register Here!
          </Link></p>
        </div>
      </MDBContainer><br />
    </Fragment>
  );
};

export default SignIn;