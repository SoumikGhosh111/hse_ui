import React, { useState } from 'react';
import { baseUrl } from '../../../../utils/baseUrl';

const AddItemForm = ({ siteId, productId, onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/sites/add-items-site`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          siteId,
          productId,
          serial_number: serialNumber,
          name: itemName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setItemName('');
        setSerialNumber('');
        setTimeout(() => {
          setMessage('');
          onSubmit(false);
        }, 2000);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error: Unable to add item. Please try again later.');
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h4 className="form-title">Add New Item</h4>
      {message && <p className="form-message">{message}</p>}
      <input
        type="text"
        className="form-input"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-input"
        placeholder="Serial Number"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
