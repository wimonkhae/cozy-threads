"use client";
import Table from "@components/Table";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

const Orders = ({ params }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retrieveUserorders = async () => {
  
      try {
        const response = await fetch(`/api/account/${params.id}/orders`);

        if (response.ok) {
          const orders = await response.json();
         
          orders.forEach((order) => {
            let itemList = []
            order.cartItems.forEach((item) => {
              itemList.push(`${item.name} (x${item.quantity}) $${item.price}`);
            });

            order.itemList = itemList
          });

          setUserOrders(orders);

        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error fetching user orders.');
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching the user orders.');
      }
    };

    retrieveUserorders();
  }, [params.id]);


  return (

    /* {Desktop view} */
    <>
    
    <section className="py-10 px-14 text-center mx-auto hidden md:block">
      <h3 className="text-3xl font-bold pr-2 ">My Orders</h3>
      <div className="mt-10 px-2">
        <Image
          className="text-transparent mb-4 mx-auto"
          src="../../icons/orders.svg"
          alt="orders"
          width={80}
          height={80}
        />
        <div className="mb-6 text-center">
          <h4 className="font-bold mb-2">Order History</h4>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="mx-auto w-4/5 text-sm mt-4">
              <Table
                data={userOrders}
                columns={[
                  { label: 'Order ID', accessor: '_id', render: (_id) => (
                    <Link href={`/order/${_id}`} className="underline hover:text-blue-600">
                      {_id}
                    </Link>
                  ) },
                  // { label: 'Payment ID', accessor: 'paymentIntent', render: (paymentIntent) => (
                  //   <Link href={`/order/${paymentIntent}`} className="underline hover:text-blue-600">
                  //     {paymentIntent}
                  //   </Link>
                  // ) },
                  { label: 'Date', accessor: 'pi_created' },
                  {
                    label: 'Items',
                    accessor: 'itemList',
                    render: (itemList) => (
                      <div className="text-left">
                        {itemList.map((item, index) => (
                          <Fragment key={index}>
                            {item}
                            {index < itemList.length - 1 && <br />}
                          </Fragment>
                        ))}
                      </div>
                    ),
                  },
                  { label: 'Total $', accessor: 'totalAmount' },
                  { label: 'Status', accessor: 'status' },
                ]}
              ></Table>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* Mobile View */}
    <section className="py-10 px-4 text-center mx-auto block md:hidden block">
        <h3 className="text-3xl font-bold pr-2">My Orders</h3>
        <div className="mt-10 px-2 ">
          <Image
            className="text-transparent mb-4 mx-auto"
            src="../../icons/orders.svg"
            alt="orders"
            width={80}
            height={80}
          />
          <h4 className="font-bold text-center mb-8">Order History</h4>
        </div>
        {error ? (
          <div>Error: {error}</div>
        ) : (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          {userOrders.map((order) => (
            <div key={order.paymentIntent} className="bg-white shadow-md rounded-md border-t-2 border-gray-100 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Order ID:</span>
                <Link
                  href={`/order/${order._id}`}
                  className="underline hover:text-blue-600"
                >
                  {order._id}
                </Link>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Date:</span>
                <span>{order.pi_created}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Items:</span>
                <div  className="text-end">
                  {order.itemList.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < order.itemList.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{order.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Status:</span>
                <span>{order.status}</span>
              </div>
            </div>
          ))}
        </div>

        )}
      </section>

    </>
  );
};

export default Orders;