import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ConfigContext from '../ConfigContext';
import { fetchYearData } from '../api';
import { LoadingSpinner, NoDataMessage } from './Alerts';
import Panel from './Panel';
import { selectedCountryType, selectedSexType, selectedYearType } from '../types';

interface RightPanelProps {
    selectedCountry: selectedCountryType;
    setSelectedCountry: (country: string) => void;
    selectedYear: selectedYearType;
    selectedSex: selectedSexType;
}

export default function RightPanel({ selectedCountry, setSelectedCountry, selectedYear, selectedSex }: RightPanelProps) {
    const config = useContext(ConfigContext);
    const [data, setData] = useState<any[] | null>(null);
    const [_loading, setLoading] = useState(false);
    const loading = !data || _loading || !selectedYear;

    useEffect(() => {
        if (selectedCountry && selectedYear && selectedSex) {
            setLoading(true);
            fetchYearData(config, selectedYear, selectedSex).then((records) => {
                setData(records);
                setLoading(false);
            });
        }
    }, [selectedCountry, selectedYear, selectedSex]);

    if (loading) {
        return <LoadingSpinner />;
    } else if (!data?.length) {
        return <NoDataMessage />;
    }

    const maxValue = Math.max(...data.map((x) => x.value));
    return (
        <Panel
            {...{
                panel: {
                    heading: 'All Countries',
                    subheading: selectedYear.toString(),
                },
                table: {
                    key: 'Country',
                    value: `${config.LABELS.amount}, ${selectedYear}`,
                    data: data.map((x) => ({
                        active: x.country === selectedCountry,
                        key: x.country,
                        value: x.value,
                        percent: Math.floor((x.value / maxValue) * 100),
                        sex: selectedSex,
                        handleClick: () => setSelectedCountry(x.country),
                    })),
                },
            }}
        />
    );
}
