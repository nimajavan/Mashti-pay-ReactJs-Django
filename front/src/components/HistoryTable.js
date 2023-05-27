import {React, useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FIALD,
} from '../constants/UserFormConstants'
import {GetOrdersAction} from '../actions/UserFormAction'



function HistoryTable({orders}) {
    const columns = [
    {
        name: 'ردیف',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'مقدار',
        selector: row => row.amount,
        sortable: true,
    },
    {
        name: 'وضعیت',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'تاریخ',
        selector: row => row.date,
        sortable: true,
    },
];
    const data = []
    try{
        if(orders){
            orders.forEach((order)=>data.push({title:order.id, amount:order.dollar_price, status:order.paid == true ? 'پراخت شده':order.paid == false ? 'پرداخت نشده': 'نامشحص'
                                            , date:order.date_stamp}))
        }
    }
    catch{
        console.log('wait for response')
    }
  return (
    <section>
        <DataTable title="تاریخچه خرید ها" columns={columns} data={data} pagination />
    </section>
  );
}

export default HistoryTable