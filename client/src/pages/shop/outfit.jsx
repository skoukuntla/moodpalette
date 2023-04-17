import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './outfit.css'
import partyprimary from './outfits/party-primary.png'
import partysecondary from './outfits/party-secondary.png'
import crownprimary from './outfits/crown-primary.png'
import crownsecondary from './outfits/crown-secondary.png'
import cowboyprimary from './outfits/cowboy-primary.png'
import cowboysecondary from './outfits/cowboy-secondary.png'
import fancyprimary from './outfits/fancy-primary.png'
import fancysecondary from './outfits/fancy-secondary.png'
import employeeprimary from './outfits/employee-primary.png'
import employeesecondary from './outfits/employee-secondary.png'
import chefprimary from './outfits/chef-primary.png'
import chefsecondary from './outfits/chef-secondary.png'
import sportsprimary from './outfits/sports-primary.png'
import sportssecondary from './outfits/sports-secondary.png'
import ninjaprimary from './outfits/ninja-primary.png'
import ninjasecondary from './outfits/ninja-secondary.png'
import popstarprimary from './outfits/popstar-primary.png'
import popstarsecondary from './outfits/popstar-secondary.png'
import discoprimary from './outfits/disco-primary.png'
import discosecondary from './outfits/disco-secondary.png'

function OutfitCard(props) {
  const outfits = [partyprimary, partysecondary, crownprimary, crownsecondary, cowboyprimary, cowboysecondary, fancyprimary, fancysecondary, employeeprimary, employeesecondary, chefprimary, chefsecondary, sportsprimary, sportssecondary, ninjaprimary, ninjasecondary, popstarprimary, popstarsecondary, discoprimary, discosecondary]
  const [outfitIndex, setOutfitIndex] = useState(props.outfitIndex + 1)
  const [outfit, setOutfit] = useState(outfits[props.outfitIndex])
  console.log("outfit:", outfitIndex)
  let balance = 80;


  const [ notEnough, setNotEnough ] = React.useState(false);
  const [ enough, setEnough ] = React.useState(false);


  const handleButtonClickNotEnough = () => {
      setNotEnough(true);
      setTimeout(() => {
          setNotEnough(false);
      }, 3000);
  }

  const handleButtonClickEnough = () => {
    setEnough(true);
    setTimeout(() => {
        setEnough(false);
    }, 3000);
}

  const move = () => {
    setOutfitIndex(((outfitIndex + 1) % 2) + props.outfitIndex)
    console.log("on toggle:", outfitIndex);
    setOutfit(outfits[outfitIndex])
  }

  const purchase = () => {
    if (balance < props.cost) {
      handleButtonClickNotEnough()
    }
    else {
      document.getElementById("purchase").visible = false;
      handleButtonClickEnough()
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 288 }}
        image={outfit}
      />
      <CardActions>
        <button onClick={move}>{'<'}</button>
        <button onClick={move}>{'>'}</button>
        {notEnough && <div className='alert-container'>
               <div className='alert-inner' style={{color: "red"}}>Not enough moo lahs!</div>
           </div>}
        {enough && <div className='alert-container'>
            <div className='alert-inner' style={{color: "green"}}>Purchased!</div>
        </div>}
      </CardActions>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.outfitName}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          {props.cost} moo lahs
        </Typography>
      </CardContent>
      <CardActions>
        <button id="purchase" onClick={purchase} disabled={props.owned}>Purchase!</button>        
      </CardActions>
    </Card>
  );
}

export default OutfitCard;