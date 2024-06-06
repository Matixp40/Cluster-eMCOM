import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AddConnection from "../components/AddConnection.jsx";
import RemoveConnection from "../components/RemoveConnection.jsx";

const API_URL = 'http://127.0.0.1:8000/'

const Stations = () => {
    const [stations, setConnections] = useState([]);

    useEffect(() => {
        fetch(API_URL + 'api/connection/')
            .then((response) => {
                return response.json()
            })
            .then((data) => setConnections(data))

    }, []);
    return (
        <>
            <Link to={"/"}>
                Go back home
            </Link>
            <h1>Stations</h1>
            <table>
                <tr>
                    <th>Caller</th>
                    <th>Called</th>
                    <th>Frequency</th>
                    <th>Connection Type</th>
                    <th>Logged by</th>
                </tr>
                {stations.map((x) => (
                    <tr key={x.id}>
                        <td>
                            <Link to={"/stations/" + x.caller}>
                                {x.caller_name}
                            </Link>
                        </td>
                        <td>
                            <Link to={"/stations/" + x.called}>
                                {x.called_name}

                            </Link>
                        </td>
                        <td>{x.frequency}</td>
                        <td>{x.connection_type}</td>
                        <td>
                            <Link to={"/stations/" + x.logged_by}>
                                {x.logged_by_name}
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>
            <AddConnection/>
            <RemoveConnection/>
        </>
    )
}

export default Stations;