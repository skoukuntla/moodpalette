import React from 'react'
import NavBar from "../navbar/index"
import OutfitCard from "./outfit"
import Grid from '@mui/material/Grid';


const MooPalShop = () => {
  return (
    <div>
    {<NavBar></NavBar>}
    <br></br>
   Welcome to the Moo Pal Shop!
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <OutfitCard outfitName="Party Pal" outfitIndex={0} cost={20}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Crowned Cow" outfitIndex={2} cost={35}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Cowboy Cow" outfitIndex={4} cost={45}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Fancy" outfitIndex={6} cost={50}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Employee" outfitIndex={8} cost={65}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Chef" outfitIndex={10} cost={85}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Athlete" outfitIndex={12} cost={110}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Ninja" outfitIndex={14} cost={150}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Popstar" outfitIndex={16} cost={195}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Disco" outfitIndex={18} cost={250}></OutfitCard>
      </Grid>
    </Grid>
   </div>
  )
}

export default MooPalShop