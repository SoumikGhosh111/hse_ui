import React, { useEffect, useState } from 'react';
import "./Sidebar.css"


function Sidebar({ onSideBarItemClicked }) {
    const [activeClass, setActiveClass] = useState(1)
    const handleIconCLick = (indx) => {
        onSideBarItemClicked(indx);
        setActiveClass(indx)
    }
    const [storeStatus, setStoreStatus] = useState('close');

    return (
        <aside id="sidebar" className=''>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    HOLE GROUP
                </div>
                <span className='icon close_icon'>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className={activeClass === 1 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(1)}>
                    <a>
                        Create Accounts
                    </a>
                </li>
                <li className={activeClass === 2 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(2)}>
                    <a>
                           Technical Assistants
                    </a>
                </li>
                <li className={activeClass === 3 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(3)}>
                    <a >
                        Inspectors
                    </a>
                </li>
                <li className={activeClass === 4 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(4)}>
                    <a >
                        Products
                    </a>
                </li>

                <li className={activeClass === 5 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(5)}>
                    <a >
                        Sites and Products Info
                    </a>
                </li>

                <li className={activeClass === 6 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(6)}>
                    <a >
                        Temporary Items
                    </a>
                </li>

                <li className={activeClass === 7 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(7)}>
                    <a >
                        Temporary Parts
                    </a>
                </li>
                
            </ul>
        </aside>
    )

}

export default Sidebar