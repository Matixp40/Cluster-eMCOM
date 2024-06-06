import {useState} from "react";

const API_URL = 'http://127.0.0.1:8000/'

const RemoveConnection = () => {
    const [id, setId] = useState('')

    const sendData = () => {
        fetch(API_URL + "api/connection/"+id+"/",
            {method:'DELETE'})
            .then(response => response.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <label>
                Connection type
                <input
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </label>
            <label>
                <button onClick={sendData} name="Send">Send</button>
            </label>
        </div>
    )
}
export default RemoveConnection;
