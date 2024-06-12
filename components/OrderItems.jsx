"use client";

import { useState, useEffect } from 'react';
import Table from './Table';

const OrderItems = ({ data }) => {

  const [lineItems, setLineItems] = useState([]);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const getCartProductDetails = async () => {
      try {
        const cart = JSON.parse(data.line_items.cart);
        const cartItemCount = cart.line_items.length;
        const itemDetails = [];

        for (let i = 0; i < cartItemCount; i++) {
          const itemPrice = cart.line_items[i].price;
          const itemQuantity = cart.line_items[i].quantity;

          const response = await fetch(`/api/product_details?price_id=${itemPrice}`);

          if (response.ok) {
            const itemData = await response.json();
            itemData.quantity = itemQuantity;
            itemData.subTotal = itemQuantity * itemData.amount
            itemDetails.push(itemData);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Error fetching order details.');
          }
        }

        setLineItems(itemDetails);
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
                { label: 'Name', accessor: 'product_name' },
                { label: 'Qty', accessor: 'quantity' },
                { label: 'Price $', accessor: 'amount' },
                { label: 'Subtotal $', accessor: 'subTotal' },
            ]}
        />
        </div>
        <div className="sm:hidden block ">
          <h5 className="font-bold text-base mt-6 mb-2">Items</h5>
          {[...lineItems].map((item, index) =>(
              <p 
                className="mb-1"
                key={index}>
                  {item.product_name} (x {item.quantity}) ${item.subTotal}
              </p>
          ))}
      
      </div>
    </div>
    
  );
};

export default OrderItems;