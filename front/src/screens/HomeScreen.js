import { React, useEffect, useState } from "react";
import { Col, Row, Button, Container, Card } from "react-bootstrap";
import "../App.css";
import wall from "../svgs/wall.svg";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;
  console.log(error);
  useEffect(() => {});
  return (
    <section id="homescreen">
      <Header />
      <Row className="p-5">
        <Col
          md="6"
          className="p-4 d-flex justify-content-center align-items-center text-center"
        >
          <Row>
            <Col sm={12}>
              <h1 className="text-white">خدمات خرید و فروش پرفکت مانی</h1>
            </Col>
            <Col sm={12}>
              <p className="text-white lead">
                خرید و انجام کلیه حواله های بانکی و خرید و فروش ووچر پرفکت مانی
              </p>
            </Col>
            <Col sm={12}>
              <Button className="btn btn-primary round-4 m-4">
                شروع خرید و فروش
              </Button>
              <Button className="btn btn-primary round-4 m-4">خروج</Button>
            </Col>
          </Row>
        </Col>
        <Col md="6" className="p-4 d-flex justify-content-center">
          <img
            className="img-fluid"
            src={wall}
            alt="img"
            height="600px"
            width="600px"
          />
        </Col>
      </Row>
      <Container>
        <Row className="text-white text-center">
          <Col md={4} sm={12}>
            <p className="display-2 fw-bold text-warning">1</p>
            <p className="fw-bold">
              مثل شیر پشتتون هستیم ولی مثل پلنگ هرچی خریدی رو سریع تحویل می دیم!
            </p>
          </Col>
          <Col md={4} sm={12}>
            <p className="display-2 fw-bold text-danger">2</p>
            <p>کارمزد خرید اول رو مهمون ما هستی رفیق</p>
          </Col>
          <Col md={4} sm={12}>
            <p className="display-2 fw-bold text-success">3</p>
            <p>هر مشکلی داشتی زنگ بزن یا تیکت ارسال کن , سه سوته حلش می کنیم</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomeScreen;
