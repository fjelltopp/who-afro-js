import axios, { AxiosResponse } from 'axios';
import { formatValue } from './src/utils';
import { ConfigType } from './types';

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        if (data?.result?.records) {
            response.data = data.result.records;
        }
        return response;
    },
    (error) => Promise.reject(error),
);

export const fetchCountries = (config: ConfigType) =>
    axios
        .get(config.DATASTORE_PATH, {
            params: {
                resource_id: config.RESOURCE_ID,
                fields: [config.API_FIELDS.country].join(','),
                distinct: 'true',
                limit: '32000',
                sort: config.API_FIELDS.country,
            },
        })
        .then(({ data: records }: AxiosResponse) =>
            records.map((record: { [key: string]: any }) => record[config.API_FIELDS.country]),
        );

export const fetchCountryData = (config: ConfigType, country: string) =>
    axios
        .get(config.DATASTORE_PATH, {
            params: {
                resource_id: config.RESOURCE_ID,
                fields: [
                    config.API_FIELDS.country,
                    config.API_FIELDS.time_axis,
                    config.API_FIELDS.segment,
                    config.API_FIELDS.value,
                ].join(','),
                q: JSON.stringify({
                    [config.API_FIELDS.country]: country,
                }),
            },
        })
        .then(({ data: records }: AxiosResponse) =>
            records.map((record: { [key: string]: any }) => ({
                year: record[config.API_FIELDS.time_axis],
                sex: record[config.API_FIELDS.segment],
                value: formatValue(config, record[config.API_FIELDS.value]),
            })),
        );

export const fetchYearData = (config: ConfigType, year: number, sex: string) =>
    axios
        .get(config.DATASTORE_PATH, {
            params: {
                resource_id: config.RESOURCE_ID,
                q: JSON.stringify({
                    [config.API_FIELDS.time_axis]: year.toString(),
                    [config.API_FIELDS.segment]: sex,
                }),
                fields: [config.API_FIELDS.country, config.API_FIELDS.value].join(','),
            },
        })
        .then(({ data: records }: AxiosResponse) =>
            records
                .map((record: { [key: string]: any }) => ({
                    country: record[config.API_FIELDS.country],
                    value: formatValue(config, record[config.API_FIELDS.value]),
                }))
                .sort((a, b) => a.value - b.value),
        );
