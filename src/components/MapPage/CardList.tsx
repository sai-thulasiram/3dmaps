'use client'


import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DeviceCard from './DeviceCard';


export interface CardData {
  title: string;
  subheader: string;
  content: string;
}

interface CardListProps {
  cards: CardData[];
  selectDevice: (arg0: any) => void
  selectedDevice: CardData
}

function CardList({ cards, selectDevice, selectedDevice }: CardListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpandClick = (cardId: number) => {
    setExpandedId(expandedId === cardId ? null : cardId);
  };

  return (
    // <div style={{ width: '40%', gap: '16px' }}>
    <Box sx={{ flexDirection: 'column', width: '30%' }}>
      {cards.map((card, index) => (
        <DeviceCard key={card.title} card={card} selectDevice={selectDevice} selectedDevice={selectedDevice} />
      ))}
    </Box>
  );
}

export default CardList;
