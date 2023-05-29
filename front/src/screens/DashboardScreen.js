import { React, useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import avatar from "../svgs/avatar.png";
import LineChart from "../components/LineChart";
import TicketTable from "../components/TicketTable";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  FetchUserProfileAction,
  UploadSelfiAction,
  UpdateProfileAction,
} from "../actions/UserProfileAction";
import { useNavigate, useRouteError } from "react-router-dom";
import { UserLogoutAction } from "../actions/UserLoginAction";
import Spinner from "../components/Spinner";
import {
  GetDollarPriceAction,
  BuyOrderAction,
  SellOrderAction,
  GetOrdersAction,
  GetSellOrdersAction,
  GetCartAction,
  RemoveCartAction,
} from "../actions/UserFormAction";
import ExchnageTable from "../components/ExchnageTable";
import HistoryTable from "../components/HistoryTable";
import SellHistoryTable from "../components/SellHistoryTable";
import { LinkContainer } from "react-router-bootstrap";
import Cart from "../components/Cart";
import Alert from "../components/Alert";
import { USER_UPDATE_SUCCESS_FINISH } from "../constants/UserLoginConstants";

function DashboardScreen() {
  window.onload = function () {
    const inform_btn = document.getElementById("inform");
    const inform_form = document.getElementById("inform_form");
    const ehraz_btn = document.getElementById("ehraz");
    const ehraz_form = document.getElementById("ehraz_form");
    const buy_form_btn = document.getElementById("buy_form_btn");
    const sell_form_btn = document.getElementById("sell_form_btn");
    const buy_form = document.getElementById("buy_form");
    const sell_form = document.getElementById("sell_form");

    inform_btn.addEventListener("click", function () {
      if (inform_form.className === "d-none") {
        inform_form.classList.remove("d-none");
        inform_form.classList.add("d-block");
        ehraz_form.classList.remove("d-block");
        ehraz_form.classList.add("d-none");
      } else {
        inform_form.classList.remove("d-block");
        inform_form.classList.add("d-none");
      }
    });
    ehraz_btn.addEventListener("click", function () {
      if (ehraz_form.className === "d-none") {
        ehraz_form.classList.remove("d-none");
        ehraz_form.classList.add("d-block");
        inform_form.classList.remove("d-block");
        inform_form.classList.add("d-none");
      } else {
        ehraz_form.classList.remove("d-block");
        ehraz_form.classList.add("d-none");
      }
    });
    buy_form_btn.addEventListener("click", function () {
      buy_form.style.display = "block";
      sell_form.style.display = "none";
    });
    sell_form_btn.addEventListener("click", function () {
      sell_form.style.display = "block";
      buy_form.style.display = "none";
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const selfiUpload = useSelector((state) => state.selfiUpload);
  const userProfile = useSelector((state) => state.userProfile);
  const dollarPrice = useSelector((state) => state.dollarPrice);
  const buy = useSelector((state) => state.buyOrder);
  const orders = useSelector((state) => state.getOrder);
  const sell_orders_history = useSelector((state) => state.getSellOrder);
  const cartState = useSelector((state) => state.getCart);
  const profileUpdate = useSelector((state) => state.userProfileUpdate);
  const { updating, update_profile_status, update_failed } = profileUpdate;
  var success_update = profileUpdate.success_update;
  const { buy_order_loading, buy_order_state, buy_order_error } = buy;
  const { get_cart_loading, cart, cart_error } = cartState;
  const { sell_orders_loading, sell_items, sell_itmes_error } =
    sell_orders_history;
  const { orders_loading, items, itmes_error } = orders;
  const { loading_price, price, dollar_error } = dollarPrice;
  const { userInfo, error } = userLogin;
  const { profile_error, profile_status, profile_loading } = userProfile;
  const { uploading, upload_res, upload_error } = selfiUpload;

  // cart
  const [cartItem, setCartItem] = useState([]);

  // profile state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [bank_card_num, setBank_card_num] = useState("");
  const [bank_shaba_num, setBank_shaba_num] = useState("");
  const [selfi_image_status, setSelfi_image_status] = useState("");
  const [selfi_image, setSelfi_image] = useState("");
  const [p_avatar, setP_Avatar] = useState("");
  const [image, setImage] = useState({ img: null });

  // buy sell state
  const [quantity, setQuantity] = useState("");
  const [dollar_price, setDollar_price] = useState("");
  const [voucher, setVoucher] = useState("");
  const [activate, setActivate] = useState("");
  const [orders_items, setOrder] = useState([]);
  const [sell_orders_items, setSellOrder] = useState([]);

  const [showCartModal, setShowCartModal] = useState(false);

  const LogoutHandller = (e) => {
    e.preventDefault();
    dispatch(UserLogoutAction());
  };

  const HandllerInputChange = async (e) => {
    e.preventDefault();
    await setImage({
      img: e.target.files[0],
    });
  };

  const SelfiFormSubmitHandller = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("selfi_image", image.img);
    dispatch(UploadSelfiAction(data));
  };

  function calculate_price(e) {
    const p = e * dollar_price.price;
    const total_price = document.getElementById("total_price");
    total_price.value = p;
  }

  const BuyFormHandller = (e) => {
    e.preventDefault();
    dispatch(BuyOrderAction(quantity));
  };

  const SellFormHandller = (e) => {
    e.preventDefault();
    dispatch(SellOrderAction(voucher, activate));
  };

  const UpdateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(
      UpdateProfileAction(name, last_name, email, bank_card_num, bank_shaba_num)
    );
  };

  if (profile_error == "token_not_valid") {
    dispatch(UserLogoutAction());
  }

  const remove_cart_func = (id) => {
    dispatch(RemoveCartAction(id));
  };

  useEffect(() => {
    if (
      !userInfo ||
      profile_error != null ||
      profile_error == "token_not_valid"
    ) {
      navigate("/login");
    } else {
      if (profile_status == null || success_update == true) {
        dispatch(FetchUserProfileAction(userInfo.token));
        dispatch({ type: USER_UPDATE_SUCCESS_FINISH });
      } else if (price == null) {
        dispatch(GetOrdersAction());
        dispatch(GetSellOrdersAction());
        dispatch(GetDollarPriceAction());
      } else {
        setPhone(userInfo.phone);
        setName(profile_status.name);
        setLastname(profile_status.last_name);
        setBank_card_num(profile_status.bank_card_num);
        setBank_shaba_num(profile_status.bank_shaba_num);
        setSelfi_image_status(profile_status.selfi_image_status);
        setP_Avatar(profile_status.avatar);
        setSelfi_image(profile_status.selfi_image);
        setDollar_price(price);
        setOrder(items);
        setSellOrder(sell_items);
        setCartItem(cart);
        setEmail(profile_status.email);
      }
    }
  }, [
    success_update,
    userInfo,
    profile_status,
    dispatch,
    price,
    items,
    sell_items,
    cart,
    navigate,
  ]);

  return (
    <section>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">مشتی پی</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">صفحه اصلی</Nav.Link>
              <Nav.Link href="#pricing">داشبورد</Nav.Link>
              <NavDropdown title="خدمات" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">کیف ووچر</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">تیکت</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  تراکنش ها
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">تیکت ها</Nav.Link>
              <Nav.Link eventKey={2} onClick={LogoutHandller}>
                خروج
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="mt-5">
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex justify-content-center" md={12}>
                <img
                  src={avatar}
                  style={{ height: 150, width: 150 }}
                  alt=""
                ></img>
              </Col>
              <Col className="d-flex justify-content-center mt-3" md={12}>
                <span>
                  {name}
                  {last_name}
                </span>
              </Col>
              <Col className="d-flex justify-content-center mt-3" md={12}>
                <Nav variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link id="inform">اطلاعات کاربری</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="ehraz">اهراز حویت</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <div id="inform_form" className="d-block" style={{ marginTop: 50 }}>
              <Container>
                {success_update ? (
                  <Alert
                    message={"آپدیت پروفایل با موفقیت انجام شد"}
                    info="profile_update"
                  />
                ) : null}
                <Form onSubmit={UpdateProfileHandler}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>نام</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-center"
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>نام خانوادگی</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-center"
                        placeholder={last_name}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>ایمیل</Form.Label>
                      <Form.Control
                        type="email"
                        className="text-center"
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>شماره همراه</Form.Label>
                      <Form.Control
                        type="number"
                        className="text-center"
                        placeholder={phone}
                      />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>شماره شبا</Form.Label>
                    <Form.Control
                      className="text-center"
                      placeholder={bank_shaba_num}
                      onChange={(e) => setBank_shaba_num(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>کارت بانکی</Form.Label>
                    <Form.Control
                      className="text-center"
                      placeholder={bank_card_num}
                      onChange={(e) => setBank_card_num(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    آپدیت پروفایل
                  </Button>
                </Form>
              </Container>
            </div>
            <div id="ehraz_form" className="d-none" style={{ marginTop: 50 }}>
              <Container className="d-flex justify-content-center">
                <Row>
                  <Col className="col-12 text-center mb-4">
                    {selfi_image_status == "to do" ? (
                      <span className="text-dark">هیچ تصویری آپلود نشده</span>
                    ) : selfi_image_status == "in progress" ? (
                      <span className="text-dark">در انتظار تایید</span>
                    ) : selfi_image_status == "failed" ? (
                      <span className="text-dark">
                        رد شده لطفا قوانین تصویر سلفی را بخوانید
                      </span>
                    ) : selfi_image_status == "done" ? (
                      <span className="text-dark">تایید شده</span>
                    ) : null}
                  </Col>
                  <Col className="col-12 d-flex justify-content-center">
                    {selfi_image != null ? (
                      <Image
                        src={selfi_image}
                        fluid
                        thumbnail
                        width={300}
                        height={300}
                      ></Image>
                    ) : (
                      <Image
                        src={avatar}
                        fluid
                        thumbnail
                        width={300}
                        height={300}
                      ></Image>
                    )}
                  </Col>
                  <Col className="col-12 mt-4 d-flex justify-content-center">
                    <form onSubmit={SelfiFormSubmitHandller}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <label
                          className="btn btn-primary fs-5"
                          style={{ paddingRight: "60px", paddingLeft: "60px" }}
                        >
                          انتخاب فایل
                          <input
                            type="file"
                            onChange={HandllerInputChange}
                            hidden
                          ></input>
                        </label>
                        <Button className="btn btn-danger m-2" type="submit">
                          آپلود
                        </Button>
                      </Form.Group>
                    </form>
                  </Col>
                  <Col className="col-12 mt-4 d-flex justify-content-center">
                    {uploading ? <Spinner /> : null}
                  </Col>
                </Row>
              </Container>
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-2">
          <Card.Body>
            <Container>
              <Row>
                <Col lg={6} md={12}>
                  <Container>
                    <Row>
                      <Col md={12} className="d-flex justify-content-center">
                        <Button
                          id="buy_form_btn"
                          className="me-3 btn-success w-100 p-2"
                          type="submit"
                        >
                          خرید
                        </Button>
                        <Button
                          id="sell_form_btn"
                          className="btn-danger w-100"
                          type="submit"
                        >
                          فروش
                        </Button>
                      </Col>
                      <Col
                        md={12}
                        className="d-flex justify-content-center mt-3"
                      >
                        <Form
                          onSubmit={BuyFormHandller}
                          className="w-100 text-center"
                          id="buy_form"
                          style={{ display: "block" }}
                        >
                          <Form.Group className="my-2">
                            <Form.Label>قیمت خرید</Form.Label>
                            <Form.Control
                              className="text-center"
                              type="number"
                              value={dollar_price.price ?? ""}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="my-2">
                            <Form.Label>تعداد</Form.Label>
                            <Form.Control
                              onBlur={(e) => {
                                setQuantity(e.target.value);
                                calculate_price(e.target.value);
                              }}
                              className="text-center"
                              type="number"
                              min={0}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="my-2">
                            <Form.Label>قیمت نهایی</Form.Label>
                            <Form.Control
                              id="total_price"
                              className="text-center"
                              type="number"
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            className="mt-3 w-50 btn-warning"
                            variant="primary"
                            type="submit"
                          >
                            ثبت سفارش
                          </Button>
                          {buy_order_loading ? (
                            <Alert
                              message={
                                "سفارش شما با موفقیت ثبت شد لطفا اقدام به پرداخت کنید"
                              }
                              info={"success"}
                            />
                          ) : buy_order_error ? (
                            <Alert
                              message={"ثبت سفارش با خطا مواجه شد"}
                              info={"error"}
                            />
                          ) : null}

                          <Button
                            className="mt-3 ms-4 btn-success"
                            onClick={(e) => {
                              dispatch(GetCartAction());
                              setShowCartModal(true);
                            }}
                            variant="primary"
                            type="button"
                          >
                            سبد خرید
                          </Button>
                          {showCartModal && (
                            <Cart
                              passChildData={setShowCartModal}
                              items={cartItem}
                              remove_cart_func={remove_cart_func}
                            />
                          )}
                        </Form>
                        <Form
                          onSubmit={SellFormHandller}
                          className="w-100 text-center"
                          id="sell_form"
                          style={{ display: "none" }}
                        >
                          <Form.Group className="my-2">
                            <Form.Label>قیمت فروش</Form.Label>
                            <Form.Control
                              className="text-center"
                              type="number"
                              value={dollar_price.price ?? ""}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="my-2">
                            <Form.Label>کد ووچر</Form.Label>
                            <Form.Control
                              onChange={(e) => {
                                setVoucher(e.target.value);
                              }}
                              className="text-center"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="my-2">
                            <Form.Label>کد فعال سازی</Form.Label>
                            <Form.Control
                              onChange={(e) => {
                                setActivate(e.target.value);
                              }}
                              className="text-center"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            className="mt-3 w-50 btn-warning"
                            variant="primary"
                            type="submit"
                          >
                            ثبت سفارش
                          </Button>
                          <Button
                            className="mt-3 ms-4 btn-success"
                            variant="primary"
                            type="button"
                          >
                            سبد خرید
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col lg={6} md={12}>
                  <div className="d-flex justify-content-center align-items-center">
                    <LineChart />
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
      <Container fluid className="mt-2">
        <Card>
          <Card.Body>
            <Container>
              {orders_loading ? (
                <h3>loading...</h3>
              ) : orders_loading == false ? (
                <HistoryTable orders={orders_items} />
              ) : null}
              {sell_orders_loading ? (
                <h3>loading...</h3>
              ) : sell_orders_loading == false ? (
                <SellHistoryTable orders={sell_orders_items} />
              ) : null}
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default DashboardScreen;
