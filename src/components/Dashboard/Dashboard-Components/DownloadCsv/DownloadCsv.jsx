import React, { useState, useEffect } from 'react';
import './Download.css';
import { baseUrl } from '../../../../utils/baseUrl';

const DownloadCsv = () => {
    const [tasks, setTasks] = useState(null);
    const [count, setCount] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/tasks/get-all-tasks`);
            const result = await response.json();
            // console.log(result); 
            setTasks(result.data);
            setCount(result.count);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const handleDateClick = async (startdate, enddate) => {
        try {
            const queryParams = new URLSearchParams({ startdate, enddate }).toString();
            const response = await fetch(`${baseUrl}/api/tasks/get-all-tasks?startDate=${startdate || ''}&endDate=${enddate || ''}`);
            const result = await response.json();
            setTasks(result.data);
            setCount(result.count);
        } catch (e) {
            console.log(e.message);
        }

    }

    const downloadTasks = async (startdate, enddate) => {
        try {

            const response = await fetch(`${baseUrl}/api/tasks/download-csv?startDate=${startdate || ''}&endDate=${enddate || ''}`);
            const blob = await response.blob();
            // console.log(startdate, enddate, "This is it")
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileName = `tasks_${startdate || 'all'}_to_${enddate || 'all'}.csv`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading tasks", error);
        }
    };

    const handleReset = async () => {
        setStartDate("")
        setEndDate("")
        setCount(0);
        fetchTasks();
    }
    return (
        <div className="download-task-container">
            <h2 className="download-task-title">Task Management</h2>
            <div className="download-task-controls">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
                <button className="fetch-tasks-btn" onClick={() => handleDateClick(startDate, endDate)}>Apply Date</button>
                <button className="download-tasks-btn" onClick={() => downloadTasks(startDate, endDate)}>Download</button>
                <button className="reset-tasks-btn" onClick={() => handleReset()}>Reset</button>
            </div>
            <h2>Total Tasks {count}</h2>
            <table className="download-task-table">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Product</th>
                        <th>Part Number</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task, index) => (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.product}</td>
                            <td>{task.part_number}</td>
                            <td>{task.inspector_name}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.due_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DownloadCsv