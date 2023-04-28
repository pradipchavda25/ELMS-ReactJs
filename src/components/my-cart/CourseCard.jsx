import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./courses.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  console.log("payment-details", paymentDetails);
  const img_url = "http://localhost:1337";

  const onToken = (token) => {
    console.log("Paytoken", token);
    axios
      .post("http://localhost:1337/api/payments", {
        data: {
          token: token.toString(),
          courseTitle: course?.attributes?.title,
          price: course?.attributes?.price,
          payment_id: token.id,
          user: token.email,
          country: token.card?.address_country,
          PaymentType: token.type,
          payment_date: course?.attributes?.createdAt,
        },
      })

      .then((response) => {
        console.log("Payment details stored successfully:", response.data);
        setPaymentDetails(response.data);
        navigate("/purchase-courses");
        AddToPurchase();
      })
      .catch((error) => {
        console.error("Error storing payment details:", error);
      });
  };

  const AddToPurchase = (token) => {
    console.log("Paytoken", token);
    axios
      .post("http://localhost:1337/api/purchase-courses", {
        data: {
          title: course?.attributes?.title,
          lesson: course?.attributes?.lesson,
          students: course?.attributes?.students,
          imageurl: course?.attributes?.imageurl,
        },
      })

      .then((response) => {
        console.log("Payment details stored successfully:", response.data);
        setPaymentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error storing payment details:", error);
      });
  };

  return (
    <div className="single__course__item course-card">
      <div className="course__details">
        <div className="course__img">
          <img
            src={`${img_url}${course?.attributes?.imageurl}`}
            alt=""
            className="w-100"
          />
        </div>
        <h6 className="course__title mb-4">
          <Badge className="title-badge" bg="dark">
            {course?.attributes?.title}
          </Badge>
        </h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i class="ri-book-open-line"></i> {course?.attributes?.lesson}{" "}
            Lessons
          </p>
          <p className="students d-flex align-items-center gap-1">
            <i class="ri-user-line"></i> {course?.attributes?.students}K
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1 course-card-end" >
            <Badge pill bg="dark" className="price-badge">
              <CurrencyRupeeIcon /> <p>{course?.attributes?.price}</p>
            </Badge>
          </p>&nbsp;&nbsp;&nbsp;
          <p className="enroll d-flex align-items-center gap-1 course-card-end" style={{ marginRight: '10px' }}>
            <Badge pill  className="buy-badge">
            <StripeCheckout
              className="paybtn stripe-btn"
              token={onToken}
              name={course?.attributes?.title}
              amount={course?.attributes?.price * 100}
              currency="INR"
              stripeKey="pk_test_51MiJNqSCDxgkzdaZxNic2uuIchQ7L54TWZSkq4iyngGN9nexDlQtwUMniFr916hRhBJxBeBScZ4vxgmQ1Gu8g91H00fYQTBLMs"
              billingAddress={true}
              zipCode={true}

            >
              Buy now
              </StripeCheckout>
            </Badge>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
