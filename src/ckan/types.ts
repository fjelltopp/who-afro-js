export interface AppProps {
    config: ConfigType;
}

export interface ConfigType {
    DATASTORE_PATH: string;
    RESOURCE_ID: string;
    RESOURCE_TITLE: string;
    LABELS: {
        segment: string;
        amount: string;
        noRowsWarning: string;
    };
    SEXES: {
        id: string;
        label: string;
        color: string;
    }[];
    API_FIELDS: {
        value: string;
        country: string;
        segment: string;
        time_axis: string;
    };
    ROUND_TO_DECIMAL_PLACES: number;
}

export type CountryType = string;

export type YearType = number;

export type SexType = string;

export type selectedCountryType = CountryType | undefined;
export type selectedYearType = YearType | undefined;
export type selectedSexType = SexType;
