import React, { useState, useEffect } from 'react';
import './Products.css'; 
import { baseUrl } from '../../../../utils/baseUrl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState({});
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 10;

  const [openProduct, setOpenProduct] = useState(null); 
const [openItem, setOpenItem] = useState(null);
  const [activeProductRow, setActiveProductRow] = useState(null); 
  const [activeModelRow, setActiveModelRow] = useState(null); 
   
  
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

  // const toggleCollapse = (id) => {
  //   setOpen((prevOpen) => ({
  //     ...prevOpen,
  //     [id]: !prevOpen[id],
  //   }));
  // };

  // const toggleCollapse = (id) => {
    
  //   setOpen((prevOpen) => {
  //     const newState = { ...prevOpen };
  //     if (newState[id]) {
  //       delete newState[id];
  //     } else {
  //       newState[id] = true;
  //     }
  //     return newState;
  //   });
  // };

  const toggleProductCollapse = (id) => {
    setOpenProduct((prevOpenProduct) => (prevOpenProduct === id ? null : id)); // Close the currently open product row if it's clicked again
  };
  
  const toggleItemCollapse = (id) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id)); // Close the currently open item row if it's clicked again
  };
  

  const handleProductRowClick = (id) => {
    setActiveProductRow((prevActiveProductRow) => {
      return prevActiveProductRow === id ? null : id;
    }); 
  }

  const handleModelRowClick = (id) => { 
    setActiveModelRow((prevActiveModelRow) => { 
      return prevActiveModelRow === id ? null : id; 
    })
  }


  // const loadMoreItems = () => {
  //   setPage(page + 1);
  // };

  // // Paginate the products data
  // const paginatedData = products.slice(0, page * itemsPerPage);
  // const totalPages = Math.ceil(products.length / itemsPerPage);

  // return (
  //   <div className="products-list">
  //       <h1>Products</h1>
  //     {paginatedData.map((product) => (
  //       <div key={product._id} className="product-item">
  //         <div className="product-header">
  //           <button className="collapsible" onClick={() => toggleCollapse(product._id)}>
  //             {product.equip_name}
  //           </button>
  //         </div>
  //         {open[product._id] && (
  //           <div className="product-details">
  //             <p>{product.description}</p>
  //             <div className="items-list">
  //               {product.items.map((item) => (
  //                 <div key={item._id} className="item">
  //                   <button className="collapsible" onClick={() => toggleCollapse(item._id)}>
  //                     {item.name}
  //                   </button>
  //                   {open[item._id] && (
  //                     <div className="item-details">
  //                       <ul>
  //                         {item.parts.map((part) => (
  //                           <li key={part._id}>
  //                             <strong>{part.part_name}</strong> (Part Number: {part.part_number})
  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     ))}
  //     {page < totalPages && (
  //       <button className="load-more" onClick={loadMoreItems}>
  //         Load More
  //       </button>
  //     )}
  //   </div>
  // );
  return ( 
    <div className="products-list">
      <h1>Products</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Equipment Name</th>
            <th>Description</th>
            <th>Models</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <React.Fragment key={product._id}>
              <tr  className={`product-row ${activeProductRow === product._id ? 'product-row-active' : ''}`}>
                <td>{product.equip_name}</td>
                <td>{product.description}</td>
                <td>{product.items.length}</td>
                <td onClick={() =>  handleProductRowClick(product._id)}>{activeProductRow === product._id ? "Shrink" : "Expand"}</td>
              </tr>
              {activeProductRow === product._id && (
                <tr className="expanded-row">
                  <td colSpan="3">
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Model Name</th>
                          <th>Parts</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.items.map((item) => (
                          <React.Fragment key={item._id}>
                            <tr  className={`item-row ${activeModelRow === item._id ? 'model-row-active' : ''}`}>
                              <td>{item.name}</td>
                              <td>{item.parts.length}</td>
                              <td onClick={() => handleModelRowClick(item._id)}>{activeModelRow === item._id ? "Shrink" : "Expand"}</td>
                            </tr>
                            {activeModelRow === item._id && (
                              <tr className="expanded-row">
                                <td colSpan="2">
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
      {/* {page < totalPages && (
        <button className="load-more" onClick={loadMoreItems}>
          Load More
        </button>
      )} */}
    </div>
   ); 
};


export default Products;
