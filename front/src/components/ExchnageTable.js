import {React, useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FIALD,
} from '../constants/UserFormConstants'
import {GetOrdersAction} from '../actions/UserFormAction'



function ExchnageTable({orders}) {
    console.log(orders)
    const columns = [
    {
        name: 'ردیف',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'متن',
        selector: row => row.director,
        sortable: true,
    },
    {
        name: 'تاریخ',
        selector: row => row.year,
        sortable: true,
    },
];
    
    const data = [
        // {
        //     id: 2,
        //     title: 'Ghostbusters',
        //     year: '1984',
        // },
    ]
    orders.forEach((order)=>data.push({title:order.id, director:order.dollar_price, year:order.id}))
  return (
    <DataTable title="تیکت ها" columns={columns} data={data} pagination />
  );
}

export default ExchnageTable