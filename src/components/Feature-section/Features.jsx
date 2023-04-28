import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "We use Quick learning mathods in our courses to teach faster to the student so student can complete the course is minimum time and remember life long !",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "if student can enroll any courses from our website we provide life long all time support from beggining to expert level student learning process to student !",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "After course Enrollment. user can access the full course content. and after comleting course content we provide Certification of course completion !",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
