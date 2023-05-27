import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TimeCounter from "../components/TimeCounter";
import {
  SendSmsAction,
  UserRegisterAction,
} from "../actions/UserRegisterAction";
import { LinkContainer } from "react-router-bootstrap";

function RegisterScreen() {
  window.onload = function () {
    const sms_form = document.getElementById("send-sms-form");
    const register_form = document.getElementById("register_form");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showSmsForm, setShowSmsForm] = useState(true);
  const send_sms_status = useSelector((state) => state.sendSms);
  const { sms_error, sms_status, sms_loading } = send_sms_status;
  const user_register_status = useSelector((state) => state.userRegister);
  const { error, status, loading } = user_register_status;

  const FormSendSmsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(SendSmsAction(phone));
  };
  const FormRegisterSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(UserRegisterAction(phone, password, code));
  };

  useEffect(() => {
    if (sms_status) {
      setShowRegisterForm(true);
      setShowSmsForm(false);
    }
    if (status) {
      navigate("/login");
    }
  }, [sms_status, status]);
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={12}>
          <Card
            className="bg-dark text-white my-5 mx-auto shadow"
            style={{ maxWidth: "500px" }}
          >
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="mb-3">ثبت نام</h2>
              <p className="text-white-50 mb-5 small">
                شماره همراه خود را وارد کنید تا کد تایید ارسال شود
              </p>
              {sms_loading ? (
                <TimeCounter />
              ) : sms_error ? (
                <p className="text-danger">{sms_error}</p>
              ) : (
                <div></div>
              )}
              {showSmsForm ? (
                <form
                  className="text-center"
                  onSubmit={FormSendSmsSubmitHandler}
                  id="send-sms-form"
                >
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

                  <Button
                    variant="outline-light"
                    type="submit"
                    className="mx-auto"
                  >
                    ارسال کد تایید
                  </Button>
                </form>
              ) : null}
              {showRegisterForm ? (
                <form
                  className="text-center"
                  onSubmit={FormRegisterSubmitHandler}
                  id="register_form"
                >
                  <FloatingLabel
                    controlId="floatingInputR"
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
                    controlId="floatingInputR2"
                    label="رمز عبور"
                    className="mb-3 text-dark small"
                  >
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInputR3"
                    label="کد تایید"
                    className="mb-3 text-dark small"
                  >
                    <Form.Control
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      type="number"
                    />
                  </FloatingLabel>

                  <Button
                    variant="outline-light"
                    type="submit"
                    className="mx-auto"
                  >
                    ثبت نام
                  </Button>
                </form>
              ) : null}
              <LinkContainer to={"/login"}>
                <p className="mt-5">
                  حساب کاربری دارید؟
                  <a
                    className="text-decoration-none text-white-50 ms-1"
                    href=""
                  >
                    ورود
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

export default RegisterScreen;
