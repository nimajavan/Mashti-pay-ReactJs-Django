import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

function TicketTable() {
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
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "تاریخ",
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      body: "1988",
      status: "1988",
      date: "1988",
    },
  ];

  return <DataTable title="تیکت ها" columns={columns} data={data} pagination />;
}

export default TicketTable;
