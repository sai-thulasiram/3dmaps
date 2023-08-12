import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';


import CardList from '../../components/MapPage/CardList'; // Adjust the path accordingly

const cards = [
  {
    title: 'Card 1 Title',
    subheader: 'Subheader 1',
    content: 'Content for Card 1',
  },
  {
    title: 'Card 2 Title',
    subheader: 'Subheader 2',
    content: 'Content for Card 2',
  },
  // Add more cards as needed
];

function HomePage() {
  return (
    <>
      <h4>Devices</h4>
      <Box sx={{ p: 2, boxShadow: 3, height: '100%' }}>
        <Stack direction="row" spacing={2}>
          <CardList cards={cards} />

          <Divider orientation="vertical" flexItem />

        </Stack>
      </Box>
    </>
  );
}

export default HomePage;

