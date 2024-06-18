"use client";

import { useState, useEffect } from 'react';
import Table from './Table';
import formatCurrency from '@utils/formatCurrency';

const OrderItems = ({ data }) => {

  const [lineItems, setLineItems] = useState([]);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const getCartProductDetails = async () => {
      try {
        const line_items = data.line_items.data;
        for (const item of line_items) {
          item.itemTotal = formatCurrency((item.amount_total /100), item.currency)

          const subtotal = formatCurrency(((item.amount_total/100) * item.quantity), item.currency)
          item.subtotal = subtotal;
        }

        setLineItems(line_items);

      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching the order details.');
      }
    };

    getCartProductDetails();

  }, [data]);


  if (error) {
    return <div className="mt-4">Error: {error}</div>;
  }

  if (lineItems.length === 0) {
    return <div className="mt-4">Loading order details...</div>;
  }

  return (
    
    <div className="text-sm mt-4">
       <div className="hidden sm:block">
        <Table 
            data={lineItems} 
            columns={[
                { label: 'Name', accessor: 'description' },
                { label: 'Qty', accessor: 'quantity' },
                { label: 'Price', accessor: 'itemTotal' },
                { label: 'Subtotal', accessor: 'subtotal' },
            ]}
        />
        </div>
        <div className="sm:hidden block ">
          <h5 className="font-bold text-base mt-6 mb-2">Items</h5>
          {[...lineItems].map((item, index) =>(
              <p 
                className="mb-1"
                key={index}>
                  {item.description} (x{item.quantity}) - ${item.subtotal}
              </p>
          ))}
      
      </div>
    </div>
    
  );
};

export default OrderItems;