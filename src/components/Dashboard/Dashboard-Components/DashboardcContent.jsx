import React from 'react';
import "./DashboardContent.css"; 

import CreateAccount from './CreateAccount/CreateAccount';

import FetchSupervisors from './Supervisors/FetchSupervisors';

import FetchInspectors from './Inspectors/Inspectors';

import Products from './Products/Products';

import SitesAndProducts from './SitesAndProducts/SitesAndProducts';

import TempItems from './TemporaryItems/TempItems';

import TempParts from './TemporaryParts/TempParts';

function DashboardcContent({itemToRender}) {
    return (
        <div className='main-container'>
            {itemToRender ? (
                <>
                    <div>
                        {itemToRender === 1 && <CreateAccount />}
                    </div>
                    <div>
                        {itemToRender === 2 && <FetchSupervisors />}
                    </div>
                    <div>
                        {itemToRender === 3 && <FetchInspectors />}
                    </div>
                    <div>
                        {itemToRender === 4 && <Products />}
                    </div>

                    <div>
                        {itemToRender === 5 && <SitesAndProducts />}
                    </div>

                    <div>
                        {itemToRender === 6 && <TempItems />}
                    </div>

                    <div>
                        {itemToRender === 7 && <TempParts />}
                    </div>
                </>

            ) : (<></>)}
        </div>
    )
}

export default DashboardcContent