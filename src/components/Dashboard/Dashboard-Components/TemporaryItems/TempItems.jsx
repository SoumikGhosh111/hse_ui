import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../../utils/baseUrl'
import './TempItems.css';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DoDisturbRoundedIcon from '@mui/icons-material/DoDisturbRounded';

const TempItems = () => {
  const [tempItems, setTempItems] = useState([]);
  
  useEffect(() => {
    fetchTempItems();
  }, []);

 
  const fetchTempItems = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/sites/fetch-all-temp-items`);
      const result = await response.json();
      console.log(result);
      setTempItems(result.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  const updateStatus = async(tempItemId,status) => { 
    // console.log(itemId)
    try{ 
      const response = await fetch(`${baseUrl}/api/sites/temp-item-status-change`, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({tempItemId, status})
    }); 
    const result = await response.json(); 
    console.log(result); 

    await fetchTempItems();
    }catch(e){  
      console.log(e.message); 
    }
  }
  return (
    <div className="temp-items-container">
      <h1>Pending Safety Critical Items</h1>
      {tempItems.length > 0 ? (
        <table className="temp-items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Serial Number</th>
              <th>Product Name</th>
              <th>Site Name</th>
              <th>Added By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tempItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.serial_number}</td>
                <td>{item.productId.equip_name}</td>
                <td>{item.siteId.site_name}</td>
                <td>{item.added_by.name}</td>
                <td>{item.status}</td>
                <td>
                  <CheckCircleOutlineRoundedIcon sx={{cursor: 'pointer'}} onClick={() => updateStatus( item._id, 'Approved')}/>
                  <DoDisturbRoundedIcon sx={{cursor: 'pointer'}} onClick={() => updateStatus(item._id, 'Rejected')}/>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No temporary items found.</p>
      )}
    </div>
  )
}

export default TempItems