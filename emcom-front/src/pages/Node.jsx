import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const API_URL = 'http://127.0.0.1:8000/'

const Node = () => {
    const [node, setNode] = useState([]);
    let { id } = useParams()

    useEffect(() => {
        fetch(API_URL + 'api/node/' + id + "/")
            .then((response) => {
                return response.json()
            })
            .then((data) => setNode(data))

    }, []);

    return (
        <>
            <Link to="/">
                Go home
            </Link>
            <h1>
                {node.node_name}
            </h1>
            <p><b>id: </b>{node.id}</p>
            <p><b>QTH: </b> {node.qth_locator}</p>
            <p><b>Last seen: {node.last_seen}</b></p>
        </>
    )
}
export default Node;