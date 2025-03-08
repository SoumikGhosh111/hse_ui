import React, {useState} from "react";
import { baseUrl } from "../../../../utils/baseUrl";

function TempSSE(){ 
    const [message, setMessage] = useState("");
    const [email, setEmail ] = useState(""); 
    const sendMessage = async () => {
        await fetch(`${baseUrl}/api/sse/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, email }),
        });
        setMessage("");
        setEmail("");
    };
    return ( 
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Enter message"
                style={{ padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
            <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email"
                style={{ padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
            <button 
                onClick={sendMessage} 
                style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Send
            </button>
        </div>
    )
}

export default TempSSE; 