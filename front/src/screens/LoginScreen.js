import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { UserLoginAction, UserLogoutAction } from "../actions/UserLoginAction";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
function LoginScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo, loading } = userLogin;

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(UserLoginAction(phone, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={12}>
          <Card
            className="bg-dark text-white my-5 mx-auto shadow"
            style={{ maxWidth: "500px" }}
          >
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="mb-3">ورود به حساب کاربری</h2>
              <p className="text-white-50 mb-5 small">
                برای ورود شماره همراه و پسورد خود را وارد کنید
              </p>

              <form onSubmit={FormSubmitHandler} className="text-center">
                <FloatingLabel
                  controlId="floatingInput"
                  label="شماره همراه"
                  className="mb-3 text-dark small"
                >
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  className="text-dark small"
                  label="پسورد"
                >
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </FloatingLabel>

                <p className="small p-4 text-white-50">
                  <a className="text-white-50 text-decoration-none" href="#">
                    رمز عبور را فراموش کرده اید؟
                  </a>
                </p>
                <Button
                  variant="outline-light"
                  type="submit"
                  className="mx-auto"
                >
                  ورود
                </Button>
              </form>
              <LinkContainer to={"/register"}>
                <p className="mt-5">
                  حساب کاربری ندارید؟
                  <a
                    href=""
                    className="text-decoration-none text-white-50 ms-2"
                  >
                    ثبت نام
                  </a>
                </p>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
