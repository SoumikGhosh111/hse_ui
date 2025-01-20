import React, { useState, useEffect } from 'react';
import './Products.css'; // Make sure to add the required styles
import { baseUrl } from '../../../../utils/baseUrl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/products/fetch-all-items`);
      const data = await response.json();
      console.log(data); // Ensure the data structure matches what you need
      setProducts(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleCollapse = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const loadMoreItems = () => {
    setPage(page + 1);
  };

  // Paginate the products data
  const paginatedData = products.slice(0, page * itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="products-list">
        <h1>Products</h1>
      {paginatedData.map((product) => (
        <div key={product._id} className="product-item">
          <div className="product-header">
            <button className="collapsible" onClick={() => toggleCollapse(product._id)}>
              {product.equip_name}
            </button>
          </div>
          {open[product._id] && (
            <div className="product-details">
              <p>{product.description}</p>
              <div className="items-list">
                {product.items.map((item) => (
                  <div key={item._id} className="item">
                    <button className="collapsible" onClick={() => toggleCollapse(item._id)}>
                      {item.name}
                    </button>
                    {open[item._id] && (
                      <div className="item-details">
                        <ul>
                          {item.parts.map((part) => (
                            <li key={part._id}>
                              <strong>{part.part_name}</strong> (Part Number: {part.part_number})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {page < totalPages && (
        <button className="load-more" onClick={loadMoreItems}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Products;
