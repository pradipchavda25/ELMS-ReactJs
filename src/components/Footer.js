import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Typography from '@mui/material/Typography';
import "./footer.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../authentication/context/AuthContext";


const footerQuickLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About Us",
    url: "/aboutus",
  },

  {
    display: "Courses",
    url: "courses",
  },

  {
    display: "Blog",
    url: "blogs",
  },
];

const footerInfoLinks = [
  {
    display: "Login",
    url: "/login",
  },
  {
    display: "Registration",
    url: "/register",
  },
  {
    display: "Contact Us",
    url: "/contactus",
  }
];
const LoginfooterInfoLinks = [
  {
    display: "My Cart",
    url: "/mycourses",
  },
  {
    display: "My Courses",
    url: "/purchase-courses",
  },
  {
    display: "Contact Us",
    url: "/contactus",
  },

];
const footerGetInTouchLinks = [
  {
    display: "Address: Surat, India",
  },
  {
    display: "Phone: +91 77898989888",
  },

  {
    display: "Email: elearning@gmail.com",
  }
];

const Footer = () => {

  const { user } = useAuthContext();


  return (
    <footer className="footer">
      <Container>
        <Row className="row">
          <Col lg="3" md="6" className="mb-4">
            <Typography className="footertitle"
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span className='title-e'>E</span>-LEARNING
            </Typography>

            <div className="follows">
              <span>
                {" "}
                <a href="https://www.facebook.com/">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://www.instagram.com/">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://www.linkedin.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://twitter.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <Link to={item.url}>
                    {item.display}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {user ? (
            <Col lg="3" md="6" className="mb-4">
              <h6 className="fw-bold">Quick Links</h6>
              <ListGroup className="link__list">
                {LoginfooterInfoLinks.map((item, index) => (
                  <ListGroupItem key={index} className="border-0 ps-0 link__item">
                    {" "}
                    <Link to={item.url}>
                      {item.display}
                    </Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          ) : (
            <Col lg="3" md="6" className="mb-4">
              <h6 className="fw-bold">Quick Links</h6>
              <ListGroup className="link__list">
                {footerInfoLinks.map((item, index) => (
                  <ListGroupItem key={index} className="border-0 ps-0 link__item">
                    {" "}
                    <Link to={item.url}>
                      {item.display}
                    </Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          )}

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Get in Touch</h6>
            <ListGroup className="link__list">
              {footerGetInTouchLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item text-link">
                  {" "}
                  {item.display}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
