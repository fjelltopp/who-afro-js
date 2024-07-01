import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Map from './map';

const App = () => {
    const [country, setCountry] = useState({});

    return (
        <>
            <h3>Incomplete MVP for a map data visualisation</h3>
            <hr />
            <div className="flex-container">
                <div style={{ width: '75%' }}>
                    <Map {...{ country, setCountry }} />
                </div>
                <div style={{ width: '25%' }}>
                    <pre>{JSON.stringify(country.properties, null, 3)}</pre>
                </div>
            </div>
        </>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
