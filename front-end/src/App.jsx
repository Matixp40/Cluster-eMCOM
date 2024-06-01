import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const API_URL = 'http://127.0.0.1:8000/'

const ASCII_0 = 48;
const ASCII_A = 65;
const ASCII_a = 97;

const addNode = (nodeName, qthLocator) => {

  fetch(API_URL + "api/node/", {
    method: 'POST',
    body: JSON.stringify({
      node_name: nodeName,
      qth_locator: qthLocator,
      last_seen: "2024-05-31T21:30:12.333Z"
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
}
const squareToLocation = (qthLocator) => {
    // Validate input
    if (typeof qthLocator !== 'string') {
        throw new Error('Input must be a string');
    }
    if (qthLocator.length < 4 || qthLocator.length > 8 || qthLocator.length % 2 !== 0) {
        throw new Error('Invalid QTH locator length');
    }

    qthLocator = qthLocator.toUpperCase();
    // Separate fields, squares and subsquares
    // Fields
    const lngField = qthLocator.charCodeAt(0) - ASCII_A;
    const latField = qthLocator.charCodeAt(1) - ASCII_A;

    // Squares
    const lngSq = qthLocator.charCodeAt(2) - ASCII_0;
    const latSq = qthLocator.charCodeAt(3) - ASCII_0;

    // Subsquares
    let lngSubSq = 0;
    let latSubSq = 0;
    if (qthLocator.length >= 6) {
        lngSubSq = qthLocator.charCodeAt(4) - ASCII_A;
        latSubSq = qthLocator.charCodeAt(5) - ASCII_A;
    }

    // Extended squares
    let lngExtSq = 0;
    let latExtSq = 0;
    if (qthLocator.length === 8) {
        lngExtSq = qthLocator.charCodeAt(6) - ASCII_0;
        latExtSq = qthLocator.charCodeAt(7) - ASCII_0;
    }

    // Calculate latitude and longitude
    let lng = -180.0;
    let lat = -90.0;

    lng += 20.0 * lngField;
    lat += 10.0 * latField;

    lng += 2.0 * lngSq;
    lat += 1.0 * latSq;

    lng += 5.0 / 60 * lngSubSq;
    lat += 2.5 / 60 * latSubSq;

    lng += 0.5 / 60 * lngExtSq;
    lat += 0.25 / 60 * latExtSq;

    return { lat, lng };
}
const getCoordinates = (location) => {
  switch(location.toLowerCase()) {
    case 'san francisco':
      return { lat: 37.7749, lng: -122.4194 };
    case 'los angeles':
      return { lat: 34.0522, lng: -118.2437 };
    case 'new york':
      return { lat: 40.7128, lng: -74.0060 };
    default:
      return { lat: 0, lng: 0 };  // Default to coordinates (0,0) if location is unknown
  }
};

export default function App() {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [coordinates1, setCoordinates1] = useState(null);
  const [coordinates2, setCoordinates2] = useState(null);
  const [nodes, setNodes] = useState([]);

  var locator = 'KN19JS';


  useEffect(() => {
    fetch(API_URL+ 'api/node/')
    .then((response) => {
        return response.json()
      })
    .then((data) => setNodes(data))

  }, [])

  const updateCoordinates = () => {
    setCoordinates1(squareToLocation(locator));
    setCoordinates2(getCoordinates(location2));
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container style={{ backgroundColor: 'purple', minHeight: '100vh', padding: '20px', color: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Find the Way
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Location 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location1}
            onChange={(e) => setLocation1(e.target.value)}
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location 2"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location2}
            onChange={(e) => setLocation2(e.target.value)}
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={updateCoordinates}>
            Find the Way
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LoadScript googleMapsApiKey="AIzaSyBjuVvNBPR-pgZJumCgW7ABOIsABTrvq1Y">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: 37.7749, lng: -122.4194 }} zoom={5}>
                {nodes.map((node) => {
                    <Marker>node.node_name</Marker>
                })}
              {coordinates1 && <Marker position={coordinates1} label="1" />}
              {coordinates2 && <Marker position={coordinates2} label="2" />}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Container>
  );
}



