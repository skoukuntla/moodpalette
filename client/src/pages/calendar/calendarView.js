import React from 'react';
import reportWebVitals from './reportWebVitals';
import Heatmap from './Heatmap'
import YearAtGlance from './YearAtGlance'
import NavBar from "../navbar/index"
export default function calendarView() {
    return (
        <React.StrictMode>
            <div class='heatmap-display'>
            {<NavBar></NavBar>}
            <h2>Habit Tracker Heat Map:</h2>
            <Heatmap></Heatmap>
            <h2>Year at a glance:</h2>
            <YearAtGlance></YearAtGlance>
            </div>
            <div>
            
            </div>
        </React.StrictMode>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();