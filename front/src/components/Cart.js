import React from "react";
import { Container, Button, Modal, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Cart(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeHandler = () => {
    props.passChildData(false);
  };
  var item = [];
  Object.entries(props.items).forEach((element) => {
    item.push({
      quantity: element[1].quantity,
      price: element[1].price,
      order_id: element[1].order_id,
    });
  });

  useEffect(() => {
    if (!show) {
      closeHandler();
    }
  }, [show]);
  return (
    <Container>
      <Modal show={show} onHide={handleClose} className="w-100">
        <Modal.Header closeButton>
          <Modal.Title>سبد خرید</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>تعداد</th>
                      <th>قیمت کل</th>
                      <th>تصویه حساب</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.map((it) => (
                      <tr>
                        <td>{it.quantity}</td>
                        <td>{it.price}</td>
                        <td>
                          <Button className="btn btn-success">پرداخت</Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => props.remove_cart_func(it.order_id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Cart;
