import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

// Mock function to get coordinates
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
  const [location3, setLocation3] = useState('');
  const [coordinates1, setCoordinates1] = useState(null);
  const [coordinates2, setCoordinates2] = useState(null);
  const [coordinates3, setCoordinates3] = useState(null);

  const updateCoordinates = () => {
    setCoordinates1(getCoordinates(location1));
    setCoordinates2(getCoordinates(location2));
    setCoordinates3(getCoordinates(location3));
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
          <TextField
            label="Location 3"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location3}
            onChange={(e) => setLocation3(e.target.value)}
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={updateCoordinates}>
            Find the Way
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LoadScript googleMapsApiKey="AIzaSyBjuVvNBPR-pgZJumCgW7ABOIsABTrvq1Y">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: 37.7749, lng: -122.4194 }} zoom={5}>
              {coordinates1 && <Marker position={coordinates1} label="1" />}
              {coordinates2 && <Marker position={coordinates2} label="2" />}
              {coordinates3 && <Marker position={coordinates3} label="3" />}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Container>
  );
}



