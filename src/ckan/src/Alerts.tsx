import React, { useContext } from 'react';
import ConfigContext from '../ConfigContext';

export function LoadingSpinner(): JSX.Element {
    return (
        <div className="text-center m-5">
            <div className="spinner-border"></div>
        </div>
    );
}

export function NoDataMessage(): JSX.Element {
    const config = useContext(ConfigContext);
    return <h3 className="text-center m-5">{config.LABELS.noRowsWarning}</h3>;
}
