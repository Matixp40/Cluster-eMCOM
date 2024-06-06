import {useState} from "react";

const API_URL = 'http://127.0.0.1:8000/'

const AddConnection = () => {
    const [caller, setCaller] = useState('')
    const [called, setCalled] = useState('')
    const [loggedBy, setLoggedBy] = useState('')
    const [frequency, setFrequency] = useState('')
    const [connection_type, setConnectionType] = useState('')

    const sendData = () => {
        fetch(API_URL + "api/connection/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "caller_id": caller,
                "called_id": called,
                "logged_by_id": loggedBy,
                "connection_type": connection_type,
                "frequency": frequency
            }),
        }).then(response => response.json())
            .then(data => console.log(data))
    }
    return (
        <div className="form-container">
            <label>
                Caller
                <input
                    value={caller}
                    onChange={e => setCaller(e.target.value)}
                />
            </label>
            <label>
                Called
                <input
                    value={called}
                    onChange={e => setCalled(e.target.value)}
                />
            </label>
            <label>
                Logged by
                <input
                    value={loggedBy}
                    onChange={e => setLoggedBy(e.target.value)}
                />
            </label>
            <label>
                Frequency
                <input
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                />
            </label>
            <label>
                Connection type
                <input
                    value={connection_type}
                    onChange={e => setConnectionType(e.target.value)}
                />
            </label>
            <label>
                <button onClick={sendData} name="Send">Send</button>
            </label>
        </div>
    )
}
export default AddConnection;
