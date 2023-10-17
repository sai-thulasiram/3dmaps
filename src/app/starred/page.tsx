"use client"

import React ,{ useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';


import CardList from '../../components/MapPage/CardList'; // Adjust the path accordingly

import MapView from './map';

const devices = [
  {
    title: 'Device1',
    subheader: 'Pangong, Ladakh',
    content: 'Content for Card 1',
    position: {
      latitude: 33.752,
      longitude: 78.66
    },
    type: 'model'
  },
  {
    title: 'Device2',
    subheader: 'Kargil, Ladakh',
    content: 'Content for Card 2',
    position: {
      latitude: 34.55,
      longitude: 76.13
    },
    type: 'model2'
  },
  {
    title: 'Device3',
    subheader: 'Rameswaram, Tamilnadu',
    content: 'Content for Card 3',
    position: {
      latitude: 9.28,
      longitude: 79.31,
      altitude: 5000
    },
    type: 'model3'
  },
  // Add more cards as needed
];

function HomePage() {
  const [ selectedDevice, setSelectedDevice ] = useState<any | null>(null);
  const selectDevice = (device: any) => {
    setSelectedDevice(device);
  };
  return (
    <>
      <h4>Devices</h4>
      <Box sx={{ p: 2, boxShadow: 3, height: '100%' }}>
        <Stack direction="row" spacing={2}>
          <CardList cards={devices} selectDevice={selectDevice} selectedDevice={selectedDevice} />
          <Divider orientation="vertical" flexItem />
          <MapView devices={devices} selectedDevice={selectedDevice} selectDevice={selectDevice} />
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;

