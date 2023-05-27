import { React, useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FIALD,
} from "../constants/UserFormConstants";
import { GetOrdersAction } from "../actions/UserFormAction";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SellHistoryTable({ orders }) {
  const handleButtonClick = (props) => {
    setInform(props);
    handleShow();
  };
  const [show, setShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inform, setInform] = useState([]);

  useEffect(() => {}, [selectedRows, inform]);

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name: "ردیف",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "مقدار",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "وضعیت",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "تاریخ",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "جزییات",
      selector: (row) => row.action,
      cell: (props) => (
        <button
          className="btn btn-primary"
          id={props.id}
          onClick={() => {
            handleButtonClick(props);
          }}
        >
          مشاهده
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const data = [];
  try {
    if (orders) {
      orders.forEach((order) =>
        data.push({
          title: order.id,
          code: order.voucher_code,
          status:
            order.paid == true
              ? "پراخت شده"
              : order.paid == false
              ? "پرداخت نشده"
              : "نامشحص",
          date: order.date_stamp,
          action: order.id,
          activations: order.activate_code,
        })
      );
    }
  } catch {
    console.log("server waiting...");
  }

  return (
    <section>
      <DataTable
        title="تاریخچه فروش ها"
        columns={columns}
        data={data}
        pagination
        onSelectedRowsChange={handleChange}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>جزییات سفارش</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>کد ووچر: </span>
            <span>{inform.code}</span>
          </div>
          <div>
            <span>کد فعالسازی: </span>
            <span>{inform.activations}</span>
          </div>
          <div>
            <span>تاریخ ایجاد سفارش: </span>
            <span>{inform.date}</span>
          </div>
          <div>
            <span>وضعیت سفارش: </span>
            <span>{inform.status}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default SellHistoryTable;
