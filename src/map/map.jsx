import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { scaleQuantize } from 'd3-scale';

const tooltipId = 'map-tooltip';
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function Map({ country, setCountry }) {
    const colorScale = scaleQuantize()
        .domain([1, 10])
        .range(['#ffedea', '#ffcec5', '#ffad9f', '#ff8a75', '#ff5533', '#e2492d', '#be3d26', '#9a311f', '#782618']);

    return (
        <>
            <ComposableMap>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const isActive = geo === country;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    data-tooltip-id={tooltipId}
                                    data-tooltip-content={geo.properties.name}
                                    onClick={() => {
                                        if (isActive) {
                                            setCountry({});
                                        } else {
                                            setCountry(geo);
                                        }
                                    }}
                                    // fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                                    style={{
                                        default: {
                                            fill: isActive ? '#E42' : '#D6D6DA',
                                            outline: 'none',
                                            stroke: '#bbbbc2',
                                            strokeWidth: 1,
                                        },
                                        hover: {
                                            fill: '#F53',
                                            outline: 'none',
                                        },
                                        pressed: {
                                            fill: '#E42',
                                            outline: 'none',
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <ReactTooltip id={tooltipId} />
        </>
    );
}
