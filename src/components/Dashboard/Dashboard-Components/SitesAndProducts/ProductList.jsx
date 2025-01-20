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

const ProductList = ({ site }) => {
  const [products, setProducts] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

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
      setProducts(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setOpenForm(true);
  };

  const closeForm = () => {
    setSelectedProductId(null);
    setOpenForm(false);
  };

  return (
    <div className="products-container">
      <h3 className="section-header">Products in {site.site_name}</h3>
      <ul className="product-list">
        {products?.map((product) => (

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="div">{product.equip_name}   <button onClick={() => handleProductClick(product.product_id)}>Add Items</button> </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <h2>Items</h2>
                <ul className="item-list">
                  {product.items.map((item) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="div">{item.name} ({item.serial_number})</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <h3>Parts</h3>
                          <ul className="parts-list">
                            {item.parts.map((part) => (
                              <li key={part._id} className="part">
                                {part.part_name} - {part.part_number}
                              </li>
                            ))}
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </ul>

              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </ul>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openForm}

      >

        <div className="backdrop-content-product-list">
          {selectedProductId ? (
            
            <div
              className="add-item-form-container"
            >
               <button onClick={closeForm} className="close-form-btn">
                Close
              </button>
              <h4>Add New Item to {site.site_name}</h4>
              <AddItemForm siteId={site._id} productId={selectedProductId} />
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