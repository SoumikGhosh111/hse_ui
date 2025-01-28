import React, { useEffect, useState } from 'react';
import './FetchSuperVisors.css'
import { baseUrl } from '../../../../utils/baseUrl';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { redableDateTimeFormat } from '../../../../utils/redableDateTimeFormat';

// Register the chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const FetchSupervisors = () => {

  const [users, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [userTask, setUserTask] = useState(null);

  useEffect(() => {
    fetchAllSupervisors();
  }, []);
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setChartData(null);
    setStartDate(null);
    setEndDate(null);
    setUserTask(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // function to fetch all supervisors
  const fetchAllSupervisors = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseUrl}/api/users/get-all-supervisors`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await response.json();
      // console.log(result.data);

      setUser(result.data);

    }
    catch (e) {
      console.log(e.message)
    }
  }

  // Function to handle user click
  const handleUserClick = async (user, startdate, enddate) => {
    setSelectedUser(selectedUser?._id === user?._id ? null : user);
    // console.log(user, "this is user");


    try {
      // If startDate and endDate are provided, include them in the query params, else pass empty strings
      const response = await fetch(`${baseUrl}/api/tasks/get-task-status-supervisor?supervisorId=${user._id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const result = await response.json();
      // console.log(result.data, "after startdate and end date is selected");
      setChartData(result.data);

      getTaskById(user._id);

    } catch (e) {
      console.log(e);
    }
  };

  // Pie chart data
  const getPieChartData = () => {
    if (!selectedUser) return {};
    if (!chartData) { // Check if chartData is null or undefined
      // console.log(chartData)
      return {
        labels: ["Pending", "Due Soon", "Overdue", "Completed"],
        datasets: [
          {
            label: 'Task Count',
            data: [0, 0, 0, 0], // Default to 0 for each category if no data is available
            backgroundColor: ['#e6cc00', '#e47200', '#c30010', '#4cbb17'],
          },
        ],
      };
    }

    return {
      labels: ["Pending", "Due Soon", "Overdue", "Completed"],
      datasets: [
        {
          label: 'Task Count',
          data: [
            chartData?.["Pending"] ? chartData["Pending"] : 0,
            chartData?.["Due Soon"] ? chartData["Due Soon"] : 0,
            chartData?.["Overdue"] ? chartData["Overdue"] : 0,
            chartData?.["Completed"] ? chartData["Completed"] : 0
          ],
          backgroundColor: ['#e6cc00', '#e47200', '#c30010', '#4cbb17'],
        },
      ],
    };
  };

  const getTaskById = async (supervisorId) => {
    try {
      const response = await fetch(`${baseUrl}/api/tasks/get-task-by-id?supervisorId=${supervisorId}`,);
      const result = await response.json();
      // console.log(result.data);
      setUserTask(result.data);
    } catch (e) {
      console.log(e.message);
    }
  }



  const handleDateApply = async(id, startdate, enddate ) => { 
   

    try {
      // If startDate and endDate are provided, include them in the query params, else pass empty strings
      const response = await fetch(`${baseUrl}/api/tasks/get-task-status-supervisor?supervisorId=${id}&startDate=${startdate || ''}&endDate=${enddate || ''}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const result = await response.json();
      console.log(result.data, "after startdate and end date is selected");
      setChartData(result.data);


    } catch (e) {
      console.log(e);
    }
  }


  const statusBackgroundColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#e6cc00';
      case 'Due Soon':
        return '#e47200';
      case 'Overdue':
        return '#c30010';
      case 'Completed':
        return '#4cbb17';
      default:
        return '#000';
    }
  }

  return (
    <div className="fetch-supervisors-container">
      <h2 className="fetch-supervisors-header">User List</h2>
      <ul className="fetch-supervisors-user-list">
        {users?.map((user) => (
          <li
            key={user._id}
            className={`fetch-supervisors-user-item ${selectedUser?._id === user._id ? 'selected' : ''}`}
            onClick={() => { handleUserClick(user, '', ''); handleOpen() }}
          >

            {user.name}


          </li>
        ))}
      </ul>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}

      >
        {users ? (
          <div className="backdrop-content">
            <button onClick={handleClose}>Close</button>
            {/* Display Pie Chart Inside Backdrop */}
            {selectedUser && (
              <>

                <h2>{selectedUser.name}'s Details</h2>
                <div className="fetch-supervisors-details-container">
                  <div className="fetch-supervisors-details">
                    <h3 className="fetch-supervisors-details-header">User Details</h3>
                    <p><strong>Id:</strong> {selectedUser._id}</p>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>

                    {/* Start and End Date Inputs */}
                    <div className="date-filter-container">
                      <input
                        type="date"
                        value={startDate || ''}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="date-input"
                      />
                      <span>to</span>
                      <input
                        type="date"
                        value={endDate || ''}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="date-input"
                      />

                      <button onClick={() => handleDateApply(selectedUser._id, startDate, endDate)}>Apply Date</button>
                    </div>
                  </div>
                </div>

                <div className='pie-chart-wrapper'>
                  <div className='pie-chart'>
                    <Pie
                      data={getPieChartData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
                <h2>Created Tasks({userTask?.length || 0}) </h2>
                <div className='supervisor-task-wrapper'  >

                  {userTask?.map((task, indx) => (
                    <div key={task._id}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography component="div"><div className='typography-title-div'>{task.product}({task.part_number})<div className='task-status-color' style={{backgroundColor: statusBackgroundColor(task.status)}}></div><p style={{textTransform: 'uppercase'}}><strong>{task.status}</strong></p></div></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div className='task-details'>
                              <p><strong>Assigned To:</strong> {task.inspector_name}</p>
                              <p><strong>Email:</strong> {task.email}</p>
                              <p><strong>Task Description:</strong> {task.note}</p>
                              <p><strong>Task Status:</strong> {task.status}</p>
                              <p><strong>Task Due Date:</strong> {redableDateTimeFormat(task.due_date)}</p>
                              <p><strong>Task Creation Date:</strong> {redableDateTimeFormat(task.createdAt)}</p>
                              <p><strong>Count of Inspections:</strong> {task.inspectionForms?.length || 0}</p>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </div>

              </>
            )}
          </div>
        ) : (
          <CircularProgress color="black" />
        )}
      </Backdrop>
    </div>
  );
};

export default FetchSupervisors;
