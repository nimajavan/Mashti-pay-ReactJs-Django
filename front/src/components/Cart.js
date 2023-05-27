import React from "react";
import { Container, Button, Modal, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function Cart(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeHandler = () => {
    props.passChildData(false);
  };
  var item = [];
  Object.entries(props.items).forEach((element) => {
    item.push({ quantity: element[1].quantity, price: element[1].price });
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
