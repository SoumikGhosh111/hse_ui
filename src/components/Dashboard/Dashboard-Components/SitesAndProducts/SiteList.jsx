import React, { useState } from 'react'
import ProductList from './ProductList';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SiteList = ({ sites }) => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [open, setOpen] = useState(false);
    console.log("This is Site List", sites);

    const handleClick = (site) => {
        setSelectedSite(site);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedSite(null);
    };
    return (
        <div className="sites-container">
            <h2 className="sites-section-header">Sites</h2>
            <ul className="site-list">
                {sites?.map((site) => (
                    <li
                        key={site._id}
                        className="site-item"
                        onClick={() => handleClick(site)}
                    >
                        {site.site_name} - {site.location}
                    </li>
                ))}
            </ul>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}

            >
                <div className='backdrop-content-product-list'>
                    <button onClick={handleClose}>Close</button>
                    {selectedSite ? (<ProductList site={selectedSite} />) : (<CircularProgress color="inherit" />)}
                </div>
            </Backdrop>

        </div>
    )
}

export default SiteList