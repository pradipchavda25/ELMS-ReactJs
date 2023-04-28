import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";
import Badge from "react-bootstrap/Badge";
import "./courses.css";

const CourseCard = ({ course }) => {
  const img_url = "http://localhost:1337";

  const alertShow = () => {
    alert('Thank You for Course Purchasing, We will add Course Content soon...')
  }

  return (
    <div className="single__course__item course-card">
      <div className="course__details">
        <div className="purchase_course__img">
          <img
            src={`${img_url}${course?.attributes?.imageurl}`}
            alt=""
            className="course__img"
            style={{ height: "100%", objectFit: "contain" }}
          />
          <h6 className="course__title mb-4">
            <Badge className="title-badge" bg="dark">
              {course?.attributes?.title}
            </Badge>
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i class="ri-book-open-line"></i> {course?.attributes?.lesson}{" "}
            Lessons
          </p>
          <p className="students d-flex align-items-center gap-1">
            <i class="ri-user-line"></i> {course?.attributes?.students}K
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ width: "100%" }}>
              <Button variant="outlined" fullWidth onClick={alertShow}>
                <Link to="">
                  <a> Learn Now</a>
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
