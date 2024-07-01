import React, { useContext } from 'react';
import ConfigContext from '../ConfigContext';
import { getSexColour } from './utils';

interface PanelProps {
    panel: {
        heading: string;
        subheading: string;
    };
    table: {
        key: string;
        value: string;
        data: {
            key: string;
            value: string;
            active: boolean;
            handleClick: () => void;
            percent: number;
            sex: string;
        }[];
    };
}

export default function Panel({ panel, table }: PanelProps) {
    const config = useContext(ConfigContext);
    const renderProgressBar = ({ percent, sex }: { percent: number; sex: string }) => (
        <div className="progress">
            <div
                className="progress-bar"
                style={{
                    width: `${percent}%`,
                    backgroundColor: getSexColour(config, sex),
                }}
            ></div>
        </div>
    );

    return (
        <>
            <div className="mb-3">
                <div className="fs-5 fw-bolder">{panel.heading}</div>
                <div className="fs-6">{panel.subheading}</div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>{table.key}</th>
                        <th colSpan={2}>{table.value}</th>
                    </tr>
                </thead>
                <tbody>
                    {table.data.map((x, index) => (
                        <tr
                            key={index}
                            className={x.active ? 'table-active' : ''}
                            style={{ cursor: 'pointer' }}
                            onClick={x.handleClick}
                        >
                            <td>{x.key}</td>
                            <td>{x.value}</td>
                            <td>{renderProgressBar(x)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
