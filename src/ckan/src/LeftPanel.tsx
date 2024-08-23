import React, { useEffect, useState, useContext } from 'react';
import ConfigContext from '../ConfigContext';
import Panel from './Panel';
import { LoadingSpinner, NoDataMessage } from './Alerts';
import LineChart from './LineChart';
import { fetchCountryData } from '../api';
import { CountryType, SexType, YearType } from '../types';

interface LeftPanelProps {
    years: YearType[];
    selectedCountry: CountryType;
    selectedYear: YearType | undefined;
    selectedSex: SexType;
    setSelectedSex: (sex: SexType) => void;
    setYears: (years: YearType[]) => void;
    setSelectedYear: (year: YearType) => void;
}

export default function LeftPanel({
    years,
    selectedCountry,
    selectedYear,
    selectedSex,
    setSelectedSex,
    setYears,
    setSelectedYear,
}: LeftPanelProps) {
    const config = useContext(ConfigContext);
    const [data, setData] = useState<any[]>();
    const [_loading, setLoading] = useState(false);
    const loading = !data || !selectedYear || _loading;

    useEffect(() => {
        if (selectedCountry) {
            setLoading(true);
            fetchCountryData(config, selectedCountry).then((countries) => {
                const years = [...new Set(countries.map(({ year }) => year))].sort() as YearType[];
                setYears(years);
                if (!selectedYear || !years.includes(selectedYear)) {
                    setSelectedYear(years.slice(-1)[0]);
                }
                setData(countries);
                setLoading(false);
            });
        }
    }, [selectedCountry, setLoading, setYears, setSelectedYear, setData]);

    if (loading) {
        return <LoadingSpinner />;
    } else if (!data.length) {
        return <NoDataMessage />;
    }

    return (
        <>
            <SummaryTable
                {...{
                    selectedCountry,
                    selectedYear,
                    selectedSex,
                    setSelectedSex,
                    data,
                }}
            />
            {years.length > 3 && (
                <div className="mt-3">
                    <LineChart {...{ years, data, selectedSex }} />
                </div>
            )}
        </>
    );
}

interface SummaryTableProps {
    selectedCountry: CountryType;
    selectedYear: YearType;
    selectedSex: SexType;
    setSelectedSex: (sex: SexType) => void;
    data: any[];
}

function SummaryTable({ selectedCountry, selectedYear, selectedSex, setSelectedSex, data }: SummaryTableProps) {
    const config = useContext(ConfigContext);
    const filteredData = data.filter(({ year }) => year == selectedYear);
    return (
        <Panel
            {...{
                panel: {
                    heading: selectedCountry,
                    subheading: selectedYear.toString(),
                },
                table: {
                    key: config.LABELS.segment,
                    value: `${config.LABELS.amount}, ${selectedYear}`,
                    data: config.SEXES.map((sex) => {
                        const row = filteredData.find((x) => x.sex === sex.id);
                        const maxValue = Math.max(...filteredData.map((x) => x.value));
                        const percent = Math.floor((row.value / maxValue) * 100);
                        return {
                            active: selectedSex === sex.id,
                            key: sex.label,
                            value: row.value,
                            percent,
                            sex: sex.id,
                            handleClick: () => setSelectedSex(sex.id),
                        };
                    }),
                },
            }}
        />
    );
}
