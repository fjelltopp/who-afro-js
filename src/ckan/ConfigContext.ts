import { createContext } from 'react';
import { ConfigType } from './types';

const ConfigContext = createContext<ConfigType>({
    DATASTORE_PATH: '',
    RESOURCE_ID: '',
    RESOURCE_TITLE: '',
    LABELS: {
        segment: '',
        amount: '',
        noRowsWarning: '',
    },
    SEXES: [],
    API_FIELDS: {
        value: '',
        country: '',
        segment: '',
        time_axis: '',
    },
    ROUND_TO_DECIMAL_PLACES: 0,
});

export default ConfigContext;
