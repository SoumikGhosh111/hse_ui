import React, { useEffect, useState } from 'react';
import "./Sidebar.css"


// icons 
import { RiAccountCircleLine } from "react-icons/ri";

import { MdEngineering } from "react-icons/md";

import { GrUserWorker } from "react-icons/gr";

import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import { FaWarehouse } from "react-icons/fa";

import { HiMiniQueueList } from "react-icons/hi2";

import { HiOutlineQueueList } from "react-icons/hi2";

import { GoTasklist } from "react-icons/go";




function Sidebar({ onSideBarItemClicked }) {
    const [activeClass, setActiveClass] = useState(1)
    const handleIconCLick = (indx) => {
        onSideBarItemClicked(indx);
        setActiveClass(indx)
    }
    const [storeStatus, setStoreStatus] = useState('close');

    const handleLogout = () => { 
        localStorage.removeItem('token');
        window.location.reload(); 
    }

    return (
        <aside id="sidebar" className=''>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    HSE GROUP
                    <img src=''/>
                </div>
                <span className='icon close_icon'>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className={activeClass === 9 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(9)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <GoTasklist size={25}/>  Temp Sender
                    </a>
                </li>
                <li className={activeClass === 10 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(10)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <GoTasklist size={25}/>  Temp Reciever
                    </a>
                </li>
                <li className={activeClass === 1 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(1)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <RiAccountCircleLine   size={25}/> Create Accounts
                    </a>
                </li>
                <li className={activeClass === 2 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(2)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <MdEngineering size={25}/>   Tech Asist
                    </a>
                </li>
                <li className={activeClass === 3 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(3)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <GrUserWorker size={25}/>  Inspection Officer
                    </a>
                </li>
                <li className={activeClass === 4 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(4)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       <MdOutlineProductionQuantityLimits size={25}/> Products
                    </a>
                </li>

                <li className={activeClass === 5 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(5)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <FaWarehouse size={25}/>  Sites Info
                    </a>
                </li>

                <li className={activeClass === 6 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(6)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <HiMiniQueueList size={25}/> Pending Models
                    </a>
                </li>

                <li className={activeClass === 7 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(7)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <HiOutlineQueueList size={25}/>  Pending Parts
                    </a>
                </li>

                <li className={activeClass === 8 ? 'active-sidebar' : 'sidebar-list-item'} onClick={() => handleIconCLick(8)}>
                    <a style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <GoTasklist size={25}/>  All Tasks
                    </a>
                </li>
                
            </ul>

            <button onClick={() => handleLogout()} className='back-to-home-side-bar'>Logout</button>
        </aside>
    )

}

export default Sidebar