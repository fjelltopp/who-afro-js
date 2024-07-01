import React, { useContext } from 'react';
import ConfigContext from '../ConfigContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getSexColour, getSexLabel } from './utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export default function LineChart({ years, data, selectedSex }) {
    const config = useContext(ConfigContext);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const totalYears = maxYear - minYear + 1;

    const options = {
        responsive: true,
        spanGaps: true,
        elements: {
            line: { tension: 0.5 },
        },
        plugins: {
            tooltip: {
                titleMarginBottom: 0,
                titleFont: { size: 18 },
                padding: 10,
                callbacks: {
                    title: (context) => {
                        const datapoint = context[0];
                        return [datapoint.label, getSexLabel(config, datapoint.dataset.label), datapoint.formattedValue].join(
                            ' ',
                        );
                    },
                    label: () => null,
                },
            },
        },
    };

    const allYears = Array.from({ length: totalYears }, (_, index) => minYear + index);

    const getValue = (year, sex) => data.find((record) => record.year === year && record.sex === sex)?.value || null;

    const chartData = {
        labels: allYears,
        datasets: [
            ...config.SEXES.map(({ id: sex }) => {
                const color = getSexColour(config, sex);
                const active = sex === selectedSex;
                return {
                    label: sex,
                    data: allYears.map((year) => getValue(year, sex)),
                    borderColor: color,
                    backgroundColor: color,
                    borderWidth: active ? 6 : 1,
                    pointRadius: active ? 4 : 2,
                    pointHoverRadius: active ? 20 : 5,
                };
            }),
            // {
            //     label: "Error Lower Bound",
            //     data: allYears.map(year => {
            //         // TODO: stop faking the error bounds
            //         const value = getValue(year, selectedSex)
            //         return value ? value - (Math.random() * 1) : null
            //     }),
            //     pointRadius: 0,
            //     pointHoverRadius: 0
            // },
            // {
            //     fill: "-1",
            //     label: "Error Upper Bound",
            //     data: allYears.map(year => {
            //         // TODO: stop faking the error bounds
            //         const value = getValue(year, selectedSex)
            //         return value ? value + (Math.random() * 1) : null
            //     }),
            //     pointRadius: 0,
            //     pointHoverRadius: 0
            // },
        ],
    };

    return <Line options={options} data={chartData} height={250} />;
}
