import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import type { CardData } from './CardList';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DeviceCard({ card, selectDevice, selectedDevice }: any) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isSelectedDevice = () => {
    return selectedDevice && card.title == selectedDevice.title;
  };

  return (
    <div onClick={() => selectDevice(card)}>
    <Card key={card.title} sx={{ width: '100%', marginBottom: '16px', cursor: 'pointer', bgColor: isSelectedDevice() ? '#1976d2' : '#fff' }} 
     >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1976d2' }} aria-label="recipe">
            {card.title && card.title.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={card.title}
        subheader={card.subheader}
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{ borderTop: '1px solid lightgrey', padding: '20px ' }}>
            
            <Typography  variant="subtitle1" component="div">
              100kms
            </Typography>
            <Typography component="div" variant="subtitle2" color="text.secondary" >
               Range
            </Typography>
          </div>
          <div style={{ borderTop: '1px solid lightgrey', padding: '20px ' }}>
            
            <Typography component="div" variant="subtitle1">
              180 degress
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div" >
            Azimuth
            </Typography>
          </div>
          
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
