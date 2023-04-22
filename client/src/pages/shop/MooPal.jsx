import React from 'react'
import NavBar from "../navbar/index"
import OutfitCard from "./outfit"
import Grid from '@mui/material/Grid';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

const MooPalShop = () => {
  const { user } = useContext(AuthContext);
  const currentOutfit = user.mooPalOutfit;
  const purchasedOutfits = user.outfitInventory ? user.outfitInventory : [];

  function setAsOutfit(index) {
    if (index == currentOutfit) {
      return "Current outfit!"
    }
    if (purchasedOutfits.includes(index)) {
      return "Set as outfit!"
    }
    else {
      return "Purchase!"
    }
  }
  
  return (
    <div>
    {<NavBar></NavBar>}
    <br></br>
   Welcome to the Moo Pal Shop!
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <OutfitCard outfitName="Party Pal" outfitIndex={0} cost={20} status={setAsOutfit(0)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Crowned Cow" outfitIndex={2} cost={35} status={setAsOutfit(2)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Cowboy Cow" outfitIndex={4} cost={45} status={setAsOutfit(4)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Fancy" outfitIndex={6} cost={50} status={setAsOutfit(6)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Employee" outfitIndex={8} cost={65} status={setAsOutfit(8)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Chef" outfitIndex={10} cost={85} status={setAsOutfit(10)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Athlete" outfitIndex={12} cost={110} status={setAsOutfit(12)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Ninja" outfitIndex={14} cost={150} status={setAsOutfit(14)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Popstar" outfitIndex={16} cost={195} status={setAsOutfit(16)}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Disco" outfitIndex={18} cost={250} status={setAsOutfit(18)}></OutfitCard>
      </Grid>
    </Grid>
   </div>
  )
}

export default MooPalShop