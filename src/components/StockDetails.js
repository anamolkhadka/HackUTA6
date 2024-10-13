import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to access URL parameters

function StockDetails(){
    const {ticker} = useParams();

    return(
        <div>
            <h2>Stock Details for {ticker}</h2>
        </div>
    )
}
export default StockDetails;
