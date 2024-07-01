"use client"
import Table from '@components/Table'
import formatCurrency from '@utils/formatCurrency'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

const Payments = ({ params }) => {
    const [error, setError] = useState(null)
    const [payments, setPayments] = useState([])

    useEffect(() =>{
       

        const retrievePayments = async() =>{

            try {
                const response = await fetch(`/api/payments/${params.id}`)

                if(response.ok){
                    const paymentList = await response.json()

                    //manipulate data
                    for(const payment of paymentList){

                        //date
                        const date = new Date(payment.created *1000).toDateString()
                        payment.created = date

                        //amount
                        const amount = formatCurrency(payment.amount/100, payment.currency)
                        payment.amount = amount

                        //order details
                        const lineItems = []
                        if (payment.line_items){
                            for(const item of payment.line_items.data){
                                lineItems.push(`${item.description} (x${item.quantity}) `)
                            }
                        } else {
                            lineItems.push("N/A")
                        }

                        payment.lineItems = lineItems


                        //status
                        const chargeStatus = payment.latest_charge?.status
                        const refunded = payment.latest_charge?.refunded
    
                        if(refunded){
                            payment.status = "refunded"
                        } else {
                            payment.status = chargeStatus? chargeStatus : payment.status
                        }
    
                    }

                    setPayments(paymentList)
                    console.log(paymentList);

                }else {
                    setError("Error getting payments", await response.json())
                }
            } catch (error) {
                setError("Error fetching payments", error)
                
            }
        }

        retrievePayments()
    }, [params.id])

    const hasRefundPermission = (payment) => {
        return payment.status === "succeeded"
    }

    const handleRefund = async (id) => {
        try {
            const response = await fetch(`/api/refund/${id}`, {
                method: "POST"
            })
            if (response.ok){
                console.log("refund success", await response.json());
                window.location.href = '/refund'
            } else {
                console.log("refund failed", await response.json());
            }
        } catch (error) {
            console.log("refund failed", error);
        }
    }


    const refundColumn = {
        label: "Refund",
        accessor: "id",
        render: (id, payment) => {
            if (hasRefundPermission(payment)){
                return (
                    <button
                        className='btn'
                        onClick={() => handleRefund(id)}
                    >
                        Request a Refund
                    </button>
                )
            } else {
                return(
                    <div>Refund Not Available</div>
                )
            }
        }
    }

  return (
    <section className="py-10 px-14 max-w-[100%] text-center mb-2">
    <h3 className="text-3xl font-bold pr-2">Payment History</h3>
    <div className="mt-10 px-2 mb-4">
      <Image
        className="text-transparent mx-auto"
        src="/icons/payment.svg" alt="account" width={80} height={80} 
      />
    </div>

    <div>
        {error? (
            <div>Error: {error} </div>
        ): (
            <div>
                {payments.length === 0 ? (
                    <div>Loading..</div>
                ): (
                    <Table
                        data={payments}
                        columns={[
                            {label: "ID", accessor: "id"},
                            {label: "Date", accessor: "created"},
                            {label: "Order Details", accessor: "lineItems",
                                render: (lineItems) => (
                                 <div>
                                       {lineItems.map((item, index)=> (
                                        <Fragment>
                                            {item}
                                            {index < lineItems.length-1 && <br/>}
                                        </Fragment>
                                    ))}
                                 </div>
                                )
                            },
                            {label: "Amount", accessor: "amount"},
                            {label: "Status", accessor: "status"},
                            refundColumn,

                        ]}
                    >

                    </Table>
                )}
            </div>
        )}

    </div>
    </section>
  )
}

export default Payments
