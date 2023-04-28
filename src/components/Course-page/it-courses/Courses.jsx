import React, {useEffect, useState} from "react";
import axios from "axios";
import "./courses.css";
import CourseCard from "./CourseCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
              <h2 className="fw-bold page-title">Our Available Courses</h2>
          </Col>
          {data.map((item) => (
            <Col md="4" className="mb-4" key={item.id}>
            <CourseCard  item={item} />
            </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
