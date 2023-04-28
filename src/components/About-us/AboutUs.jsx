import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/aboutus.jpg";
import CountUp from "react-countup";
import "./about.css";

const AboutUs = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
                E-LEARNING is a plateform to provide so many courses with
                affordable prices. its allows students to register their self
                and enroll the course releted to thier skillset. and after
                enrollment user can get lifetime access of the course
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={100} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Courses Available</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={4500} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Students Around World</p>
                  </div>
                </div>

                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={50} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Tuters Available</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={10000} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Hours of Content</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
