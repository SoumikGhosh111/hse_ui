import React, {useState, useEffect} from 'react'; 
import './SitesAndProducts.css';
import { baseUrl } from '../../../../utils/baseUrl';

import SiteList from './SiteList';

const SitesAndProducts = () => {
    const [sites, setSites] = useState(null);
    
    
    useEffect(() => { 
        fetchSites(); 
    }, []); 

    const fetchSites = async() => { 
        try{ 
            const response = await fetch(`${baseUrl}/api/sites/fetch-all-sites`, { 
                method: 'GET', 
                headers: { 
                    'Content-Type': 'application/json',
                }, 
            });

            const result = await response.json(); 
            // console.log(result); 
            setSites(result.data);
        }catch(e){ 
            console.log(e.message); 
        }
    }
  return (
    <div className='sites-and-products-container'>
        <SiteList sites = {sites}/>
    </div>
  )
}

export default SitesAndProducts; 