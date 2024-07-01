import React, { useEffect, useState, useContext } from 'react';
import ConfigContext from './ConfigContext';
import { fetchCountries } from './api';
import LeftPanel from './src/LeftPanel';
import RightPanel from './src/RightPanel';
import './styles.css';
import { selectedCountryType, selectedYearType, CountryType, selectedSexType, YearType } from './types';

export default function App(): JSX.Element {
    const config = useContext(ConfigContext);
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [years, setYears] = useState<YearType[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<selectedCountryType>();
    const [selectedYear, setSelectedYear] = useState<selectedYearType>();
    const [selectedSex, setSelectedSex] = useState<selectedSexType>(config.SEXES[0].id);

    useEffect(() => {
        fetchCountries(config).then((countries: CountryType[]) => {
            setCountries(countries);
            setSelectedCountry(countries[0]);
        });
    }, []);

    function Toolbar() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group">
                        {config.SEXES.map((sex) => (
                            <button
                                key={sex.id}
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSex === sex.id && 'active'}`}
                                onClick={() => setSelectedSex(sex.id)}
                            >
                                <span style={{ color: sex.color }}>■</span>
                                <span> {sex.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-8 text-end">
                    <div className="inline-inputs me-3">
                        <span className="fw-bolder">Country </span>
                        <select
                            className="form-select"
                            style={{ maxWidth: 200 }}
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            {countries.map((country) => (
                                <option key={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inline-inputs">
                        <span className="fw-bolder">Year </span>
                        <select
                            className="form-select"
                            style={{ maxWidth: 100 }}
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {years.map((year) => (
                                <option key={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title m-1 my-3">{config.RESOURCE_TITLE}</h4>
            </div>
            <div className="card-body border-top border-bottom bg-light">
                <Toolbar />
            </div>
            {selectedCountry && (
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 border-end">
                            <LeftPanel
                                {...{
                                    years,
                                    selectedCountry,
                                    selectedYear,
                                    selectedSex,
                                    setSelectedSex,
                                    setYears,
                                    setSelectedYear,
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <RightPanel {...{ selectedCountry, setSelectedCountry, selectedYear, selectedSex }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
