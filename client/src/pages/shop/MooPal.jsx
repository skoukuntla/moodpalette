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
  
  return (
    <div>
    {<NavBar></NavBar>}
    <br></br>
   Welcome to the Moo Pal Shop!
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <OutfitCard outfitName="Party Pal" outfitIndex={0} cost={20} status={purchasedOutfits.includes(0) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Crowned Cow" outfitIndex={2} cost={35} status={purchasedOutfits.includes(2) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Cowboy Cow" outfitIndex={4} cost={45} status={purchasedOutfits.includes(4) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Fancy" outfitIndex={6} cost={50} status={purchasedOutfits.includes(6) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Employee" outfitIndex={8} cost={65} status={purchasedOutfits.includes(8) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Chef" outfitIndex={10} cost={85} status={purchasedOutfits.includes(10) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Athlete" outfitIndex={12} cost={110} status={purchasedOutfits.includes(12) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Ninja" outfitIndex={14} cost={150} status={purchasedOutfits.includes(14) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Popstar" outfitIndex={16} cost={195} status={purchasedOutfits.includes(16) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
      <Grid item xs={4}>
        <OutfitCard outfitName="Disco" outfitIndex={18} cost={250} status={purchasedOutfits.includes(18) ? "Set as outfit!" : "Purchase!"}></OutfitCard>
      </Grid>
    </Grid>
   </div>
  )
}

export default MooPalShop