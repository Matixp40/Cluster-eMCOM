import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, StyleSheet, View, Button, TextInput } from 'react-native';

export default function App() {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [location3, setLocation3] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const getCoordinates = async () => {
    try {
      const response = await fetch('https://your-django-api-endpoint.com/geocode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location1: location1,
          location2: location2,
          location3: location3,
        }),
      });
      const data = await response.json();
      if (data && data.coordinates) {
        setCoordinates({
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
        });
      } else {
        alert('Coordinates not found');
      }
    } catch (error) {
      alert('Error fetching coordinates');
    }
  };

  return (
    <View style={{ backgroundColor: 'purple', flex: 1 }}>
      <View style={{ backgroundColor: 'purple', flex: 1 }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>XXXXXXX</Text>
      </View>
      <TextInput
        style={{ backgroundColor: 'white', borderWidth: 2, borderColor: 'purple', padding: 10, margin: 10 }}
        value={location1}
        onChangeText={setLocation1}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>YYYYYY</Text>
      </View>
      <TextInput
        style={{ backgroundColor: 'white', borderWidth: 2, borderColor: 'purple', padding: 10, margin: 10 }}
        value={location2}
        onChangeText={setLocation2}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>ZZZZZZZZ</Text>
      </View>
      <TextInput
        style={{ backgroundColor: 'white', borderWidth: 2, borderColor: 'purple', padding: 10, margin: 10 }}
        value={location3}
        onChangeText={setLocation3}
      />
      <View style={{ alignItems: 'center' }}>
        <Button title="Find the Way" color="#841584" onPress={getCoordinates} />
      </View>
      <View style={{ flex: 25 }}>
        <View style={styles.container}>
          <MapView style={styles.map}>
            {coordinates && (
              <Marker
                coordinate={coordinates}
                title="Location"
                description={`${location1}, ${location2}, ${location3}`}
              />
            )}
          </MapView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 14,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});