import React, { useState } from 'react'
import ProductList from './ProductList';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SiteList = ({ sites }) => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [open, setOpen] = useState(false);
    const [expandedSite, setExpandedSite] = useState(null);
    console.log("This is Site List", sites);

    const handleClick = (site) => {
        setSelectedSite(site);
        setOpen(true);
        
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedSite(null);
        setExpandedSite(null);
    };

    const toggleSiteDetails = (site) => {
        setExpandedSite(expandedSite === site._id ? null : site._id); // Toggle the site details
        setSelectedSite(site);
        setOpen(true);
    };

    const handleFormSubmit = (value) => {
        setOpen(value);
        setSelectedSite(null);
        setExpandedSite(null);
    }

    return (
        <div className="sites-container">
            <h2 className="sites-section-header">Sites</h2>
            <table className="site-table">
                <thead>
                    <tr>
                        <th>Site Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sites?.map((site) => (
                        <tr key={site._id}>
                            <td>{site.site_name}</td>
                            <td>{site.location}</td>
                            <td>
                                <button className='button' onClick={() => toggleSiteDetails(site)}>
                                    View Site Info
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {expandedSite && (
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
                    <div className="backdrop-content-product-list">
                        <button className='button' onClick={handleClose}>Close</button>
                        {selectedSite ? <ProductList site={selectedSite} onFormSubmit={handleFormSubmit}/> : <CircularProgress color="inherit" />}
                    </div>
                </Backdrop>
            )}
        </div>
    ); 
}

export default SiteList