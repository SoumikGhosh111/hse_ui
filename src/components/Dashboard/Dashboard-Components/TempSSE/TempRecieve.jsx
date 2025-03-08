import React, {useEffect, useState} from "react";
import { baseUrl } from "../../../../utils/baseUrl";

function TempRecieve() {
    const [messages, setMessages] = useState([]);
    const email = "inspector-03@example.com"; 

    useEffect(() => {
        const eventSource = new EventSource(`${baseUrl}/api/sse/message?email=${email}`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [...prev, data.message]);
        };

        return () => {
            eventSource.close();
        };
    }, []);
    return ( 
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ color: "#333", marginBottom: "10px" }}>Messages</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
            {messages.map((msg, index) => (
                <li 
                    key={index} 
                    style={{ 
                        background: "#f1f1f1", 
                        padding: "10px", 
                        margin: "5px auto", 
                        borderRadius: "5px", 
                        maxWidth: "300px", 
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)" 
                    }}
                >
                    {msg}
                </li>
            ))}
        </ul>
    </div>
    )
}

export default TempRecieve;