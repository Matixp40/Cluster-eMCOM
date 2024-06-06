import {useState} from "react";

const API_URL = 'http://127.0.0.1:8000/'

const RemoveConnection = () => {
    const [id, setId] = useState('')

    const sendData = () => {
        fetch(API_URL + "api/node/" + id + "/",
            {method: 'DELETE'})
            .then(response => response.json())
            .then(data => console.log(data))
    }
    return (
        <div className="form-container">
            <b>Remove station</b>
            <br/>
            <label>
                Station id
                <input
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </label>
            <button onClick={sendData} name="Send">Send</button>
        </div>
    )
}
export default RemoveConnection;
