import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";
import CourseCard from "./CourseCard";
import axios from "axios";
import Loader from "../Loader";
import Badge from "@mui/material/Badge";

import ClearIcon from '@mui/icons-material/Clear';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/my-courses?populate=%2A")
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1337/api/my-courses/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold page-title">Your Selected Courses</h2>
          </Col>

          {loading ? (
            <Loader />
          ) : (
            <>
              {courses.map((course) => (
                <Col md="4" className="mb-4 cart-course-card" key={course.id}>
                  <Badge 
                    badgeContent={
                      <ClearIcon className="Removebadge"
                        onClick={() => handleDelete(course.id)}
                      />
                    }
                  >
                    <CourseCard course={course} />
                  </Badge>
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
