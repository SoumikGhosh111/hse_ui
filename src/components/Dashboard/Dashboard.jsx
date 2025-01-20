import React, {useState}  from 'react'; 
import "./Dashboard.css"

import Sidebar from './Dashboard-Components/Sidebar';
import DashboardcContent from './Dashboard-Components/DashboardcContent';

function Dashboard() {
  const [currentItem, setCurrentItem] = useState(1); 
  const handleIconCLick = (indx) => { 
      setCurrentItem(indx); 
  } 
  return (
    <div className='grid-container'>
        <Sidebar onSideBarItemClicked = {handleIconCLick}/>
        <DashboardcContent itemToRender = {currentItem}/>
    </div>
  )
}

export default Dashboard;