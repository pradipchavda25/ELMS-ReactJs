import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";
import Loader from "../Loader";
import "./courses.css";
import Badge from "react-bootstrap/Badge";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useAuthContext } from "../../authentication/context/AuthContext";
import axios from "axios";
const CourseCard = ({ item }) => {
  const { user } = useAuthContext();

  const img_url = "http://localhost:1337";

  const handleEnrollClick = async (item) => {
    try {
      const { data } = await axios.post(
        "http://localhost:1337/api/my-courses?populate=%2A",
        {
          data: {
            title: item.attributes.title,
            lesson: item.attributes.lesson,
            students: item.attributes.students,
            price: item.attributes.price,
            imageurl: item?.attributes?.imageurl?.data?.attributes?.url,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="courses-cards">
      {item ? (
        <div className="single__course__item course-card" key={item.id}>
          <>
            <div className="course__img">
              <img
                src={`${img_url}${item?.attributes?.imageurl?.data?.attributes?.url}`}
                alt=""
                className="w-100"
              />
            </div>
            <div className="course__details">
              <h6 className="course__title mb-4">{item?.attributes?.title}</h6>
            
              <div className=" d-flex justify-content-between align-items-center">
                <p className="lesson d-flex align-items-center gap-1">
                  <i className="ri-book-open-line"></i>{" "}
                  {item?.attributes?.lesson} Lessons
                </p>

                <p className="students d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> {item?.attributes?.students}K
                </p>
              </div>

              <div className=" d-flex justify-content-between align-items-center">
                <p className="rating d-flex align-items-center gap-1 course-card-end">
                  <Badge pill bg="dark" className="price-badge">
                    <CurrencyRupeeIcon /> <p>{item?.attributes?.price}</p>
                  </Badge>
                </p>
                &nbsp;&nbsp;&nbsp;
                <p className="enroll d-flex align-items-center gap-1 course-card-end">
                  {user ? (
                    <Link to="/mycourses">
                      <Button
                        variant="outlined"
                        onClick={() => handleEnrollClick(item)}
                      >
                        <a> Add To Cart</a>
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button variant="outlined">
                        <a> Add To Cart</a>
                      </Button>
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </>
        </div>
      ) : (
        <>
          <Loader />
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default CourseCard;
