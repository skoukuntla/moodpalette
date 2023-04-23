import React from 'react';
import Heatmap from './Heatmap'
import YearAtGlance from './YearAtGlance'
import NavBar from "../navbar/index"
import Grid from '@mui/material/Grid';

export default function calendarView() {

    return (
        <React.StrictMode>
            <div>
            {<NavBar></NavBar>}
            <br></br>
            <div class="calendars">
            <h2>Habit Tracker Heat Map:</h2>
            <Heatmap></Heatmap>            
            <h2>Year at a glance:</h2>
            <br></br>
            <YearAtGlance></YearAtGlance>
            </div>
            </div>

        </React.StrictMode>
    )
}