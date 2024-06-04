import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const API_URL = 'http://127.0.0.1:8000/'

const ASCII_0 = 48;
const ASCII_A = 65;

const squareToLocation = (qthLocator) => {
    if (typeof qthLocator !== 'string') {
        throw new Error('Input must be a string');
    }
    if (qthLocator.length < 4 || qthLocator.length > 8 || qthLocator.length % 2 !== 0) {
        throw new Error('Invalid QTH locator length');
    }

    qthLocator = qthLocator.toUpperCase();
    const lngField = qthLocator.charCodeAt(0) - ASCII_A;
    const latField = qthLocator.charCodeAt(1) - ASCII_A;

    const lngSq = qthLocator.charCodeAt(2) - ASCII_0;
    const latSq = qthLocator.charCodeAt(3) - ASCII_0;

    let lngSubSq = 0;
    let latSubSq = 0;
    if (qthLocator.length >= 6) {
        lngSubSq = qthLocator.charCodeAt(4) - ASCII_A;
        latSubSq = qthLocator.charCodeAt(5) - ASCII_A;
    }

    let lngExtSq = 0;
    let latExtSq = 0;
    if (qthLocator.length === 8) {
        lngExtSq = qthLocator.charCodeAt(6) - ASCII_0;
        latExtSq = qthLocator.charCodeAt(7) - ASCII_0;
    }

    let lng = -180.0;
    let lat = -90.0;

    lng += 20.0 * lngField;
    lat += 10.0 * latField;

    lng += 2.0 * lngSq;
    lat += latSq;

    lng += 5.0 / 60 * lngSubSq;
    lat += 2.5 / 60 * latSubSq;

    lng += 0.5 / 60 * lngExtSq;
    lat += 0.25 / 60 * latExtSq;

    return {lat, lng};
}
const Home = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        fetch(API_URL + 'api/node/')
            .then((response) => {
                return response.json()
            })
            .then((data) => setNodes(data))

    }, []);
    return (
        <>
            <div id="header">
                <h1>EmCom Cluster</h1>
                <Link to="/stations">
                    Stations
                </Link>
                <Link to="/add-connection">
                    Add Connection
                </Link>
                <Link to="/remove-connection">
                    Remove Connection
                </Link>
                <Link to="/add-node">
                    Add Node
                </Link>
                <Link to="/remove-node">
                    Remove Node
                </Link>
            </div>
            <APIProvider apiKey={"AIzaSyBjuVvNBPR-pgZJumCgW7ABOIsABTrvq1Y"}>
                <Map
                    style={{width: '100vw', height: '100vh'}}
                    defaultCenter={{lat: 22.54992, lng: 0}}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {nodes.map((x) => (
                        <Marker key={x.id} position={squareToLocation(x.qth_locator)}>{x.node_name}</Marker>
                    ))}
                </Map>
            </APIProvider>
        </>
    )
}

export default Home;