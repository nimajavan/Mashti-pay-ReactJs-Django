import {React, useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import {useDispatch, useSelector} from 'react-redux';




function TicketTable() {
    const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Director',
        selector: row => row.director,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
    
  return (
    <DataTable title="تیکت ها" columns={columns} data={data} pagination />
  );
}

export default TicketTable