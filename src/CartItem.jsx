import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
      // Initialize a variable total to hold the cumulative sum
  let total = 0;

  // Iterate over the cart array using cart.forEach()
  cart.forEach((item) => {
    // Extract its quantity and cost, convert cost string, and multiply
    const itemCost = parseFloat(item.cost.substring(1));
    const itemTotal = itemCost * item.quantity;

    // Add the resulting value to total
    total += itemTotal;
  });

  // After processing all items, return the final total sum
  return total;
  };

  const handleContinueShopping = (e) => {
      // Prevent default form/anchor submission behavior if applicable
    e.preventDefault(); 

     // Call the function passed from the parent component
    onContinueShopping(e);
  };

const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};


  const handleIncrement = (item) => {
    // Dispatch updateQuantity with the current quantity plus 1
  // Using the 'name' parameter as the identifier
  dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
   // Check if the item's quantity is greater than 1
  if (item.quantity > 1) {
    // Dispatch updateQuantity to decrease the quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
} else {
    // Else if the quantity drops to 0, completely remove the item
    // Using the 'name' parameter as the identifier
    dispatch(removeItem({ name: item.name }));
  }
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action using the item's name as the identifier
  dispatch(removeItem({ name: item.name }));
  // Automatic removal inside your decrease button function
}
  const handleDecrementWithRemoval = (item) => {
  if (item.quantity > 1) {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  } else {
    // If quantity is 1 and they click minus, delete the item entirely
    dispatch(removeItem({ name: item.name }));
  }
};

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
     // Extract the numeric value from the cost string (e.g., "$15.00" -> 15.00)
  const unitPrice = parseFloat(item.cost.substring(1));
  
  // Calculate total cost by multiplying quantity with the unit price
  return unitPrice * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


