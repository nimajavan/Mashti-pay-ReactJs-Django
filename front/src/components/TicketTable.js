import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

function TicketTable(props) {
  const [inform, setInform] = useState("");
  const handleButtonClick = (props) => {
    setInform(props);
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let x = props.tickets;
  const columns = [
    {
      name: "موضوع",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "متن",
      selector: (row) => row.body,
      sortable: true,
    },
    {
      name: "وضعیت",
      selector: (row) =>
        row.status == "in progress"
          ? "در حال برررسی"
          : row.status == "done"
          ? "پاسخ داده شد"
          : null,
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

  var data = Object.values(x || {});
  return (
    <section>
      <DataTable title="تیکت ها" columns={columns} data={data} pagination />;
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>جزییات تیکت</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>موضوع:</span>
            <span>{inform.title}</span>
          </div>
          <div>
            <span>متن پیام:</span>
            <span>{inform.body}</span>
          </div>
          <div>
            <span>تاریخ ایجاد : </span>
            <span>{inform.date}</span>
          </div>
          <div>
            {inform &&
              inform.reply_ticket.map((item, key) => (
                <div className="d-flex flex-column mb-3">
                  <span>پاسخ:</span>
                  <span>{item.reply_body}</span>
                </div>
              ))}
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

export default TicketTable;
