import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";
import CourseCard from "./CourseCard";
import axios from "axios";
import Loader from "../Loader";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/purchase-courses?populate=%2A")
      .then((response) => {
        const data = response.data.data;
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="page-title">Purchased Courses</h2>
          </Col>

          {loading ? (
            <Loader />
          ) : (
            <>
              {courses.map((course) => (
                <Col md="4" className="mb-4" key={course.id}>
                  <CourseCard course={course} />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
