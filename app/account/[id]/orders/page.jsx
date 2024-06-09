"use client";
import Table from "@components/Table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Orders = ({ params }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retrieveUserorders = async () => {
      try {
        console.log("getting user orders form ordercard component");
        const response = await fetch(`/api/account/${params.id}/orders`);

        if (response.ok) {
          const orders = await response.json();
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

  const handleRefund = async (paymentIntent) => {
    try {
      const response = await fetch(`/api/refund/${paymentIntent}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Refund successful, you can update the UI accordingly
        console.log('Refund successful');
      } else {
        // Refund failed, handle the error
        console.error('Refund failed');
      }
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  };

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">My Orders</h3>
      <div className="mt-10 px-2">
        <Image
          className="mb-4 ml-1"
          src="../../icons/orders.svg"
          alt="orders"
          width={80}
          height={80}
        />
        <div className="mb-4">
          <h4 className="font-bold mb-2">Purchase History</h4>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="flex text-sm mt-4">
              <Table
                data={userOrders}
                columns={[
                  { label: 'Payment ID', accessor: 'paymentIntent', render: (paymentIntent) => (
                    <Link href={`/order/${paymentIntent}`} className="underline hover:text-blue-600">
                      {paymentIntent}
                    </Link>
                  ) },
                  { label: 'Date', accessor: 'pi_created' },
                  { label: 'Total $', accessor: 'totalAmount' },
                  { label: 'Status', accessor: 'status' },
                  {
                    label: 'Refund',
                    render: (paymentIntent) => (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleRefund(paymentIntent)}
                      >
                        Refund
                      </button>
                    ),
                  },
                ]}
              ></Table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;