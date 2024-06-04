import {useState} from "react";

const API_URL = 'http://127.0.0.1:8000/'

const AddStation = () => {
    const [callsign, setCallsign] = useState('')
    const [qthLocator, setQthLocator] = useState('')
    const sendData = () => {
        fetch(API_URL + "api/node/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "node_name": callsign,
                "qth_locator": qthLocator,
                "last_seen": "2024-06-04T18:16:22.422Z"
            }),
        }).then(response => response.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <label>
                Station callsign
                <input
                    value={callsign}
                    onChange={e => setCallsign(e.target.value)}
                />
            </label>
            <label>
                QTH Locator
                <input
                    value={qthLocator}
                    onChange={e => setQthLocator(e.target.value)}
                />
            </label>
            <label>
                <input type="button" onClick={sendData} name="Send"/>
            </label>
        </div>
    )
}
export default AddStation;
