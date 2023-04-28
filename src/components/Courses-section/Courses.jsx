import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Courses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/it-courses?populate=%2A")
      .then((response) => {
        const dataRes = response.data.data;
        setData(dataRes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Our Popular Courses</h2>
                <p>Here are some popular courses available on our website.</p>
              </div>

              <div className="w-50 text-end">
                <Link to="/courses" className="btn see_all_btn">
                  See All
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Carousel
            className="slider"
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {data.map((item) => (
              <Col key={item.id}>
                <CourseCard item={item} />
              </Col>
            ))}
          </Carousel>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
