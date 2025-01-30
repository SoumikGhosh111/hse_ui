import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../../utils/baseUrl';
import AddItemForm from './AddItemForm';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductList = ({ site, onFormSubmit }) => {
  const [products, setProducts] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const[openPartsForm, setOpenPartsForm] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    fetchProducts(site);
  }, [site]);

  const fetchProducts = async (site) => {
    try {
      const response = await fetch(`${baseUrl}/api/sites/fetch-products/${site._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result);
      setProducts(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleProductDetails = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const toggleItemDetails = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setOpenForm(true);
  };

  const closeForm = () => {
    setSelectedProductId(null);
    setOpenForm(false);
  };

  const handleItemClick = (itemId) => {
    setSelectedProductId(itemId);
    setOpenPartsForm(true);
  }; 

  const handleItemFormSubmit = (response) =>{ 
    
    setOpenForm(response);
    onFormSubmit(response); 
  }

  return (
    <div className="products-container">
      <h3 className="section-header">Products in {site.site_name}</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Models</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <React.Fragment key={product._id}>
              <tr>
                <td>{product.equip_name}</td>
                <td>{product.items.length}</td>

                <td>
                  <button className='button expand-product-button' onClick={() => toggleProductDetails(product.product_id)}>
                    {expandedProduct === product.product_id ? 'Shrink' : 'Expand'}
                  </button>
                  <button className='button' onClick={() => handleProductClick(product.product_id)}>Add Models To Site</button>
                </td>
              </tr>
              {expandedProduct === product.product_id && (
                <tr>
                  <td colSpan="2">
                    {/* <h3>Items</h3> */}
                    <table className="item-table">
                      <thead>
                        <tr>
                          <th>Model Name</th>
                          <th>Serial Number</th>
                          <th>Parts</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.items.map((item) => (
                          <React.Fragment key={item._id}>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.serial_number}</td>
                              <td>{item.parts.length}</td>
                              <td>
                                <button className='button expand-model-button' onClick={() => toggleItemDetails(item._id)}>
                                  {expandedItem === item._id ? 'Shrink Parts' : 'Expand Parts'}
                                </button>

                                <button className='button expand-model-button' >
                                  Add Parts To Model
                                </button>
                              </td>

                            </tr>
                            {expandedItem === item._id && (
                              <tr>
                                <td colSpan="3">
                                  {/* <h4>Parts</h4> */}
                                  <table className="parts-table">
                                    <thead>
                                      <tr>
                                        <th>Part Name</th>
                                        <th>Part Number</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.parts.map((part) => (
                                        <tr key={part._id}>
                                          <td>{part.part_name}</td>
                                          <td>{part.part_number}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={openForm}>
        <div className="backdrop-content-product-list">
          {selectedProductId ? (
            <div className="add-item-form-container">
              <button onClick={closeForm} className="close-form-btn">
                Close
              </button>
              <h4>Add New Item to {site.site_name}</h4>
              <AddItemForm siteId={site._id} productId={selectedProductId} onSubmit={handleItemFormSubmit}/>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Backdrop>
    </div>
  )
}

export default ProductList