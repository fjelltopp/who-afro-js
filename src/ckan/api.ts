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

export const fetchCountryData = (config: ConfigType, country: string) => {
    let fields = [config.API_FIELDS.country, config.API_FIELDS.time_axis, config.API_FIELDS.value].join(',');
    if (config.API_FIELDS.segment && !(config.API_FIELDS.segment === '')) {
        fields = [
            config.API_FIELDS.country,
            config.API_FIELDS.time_axis,
            config.API_FIELDS.segment,
            config.API_FIELDS.value,
        ].join(',');
    }

    return axios
        .get(config.DATASTORE_PATH, {
            params: {
                resource_id: config.RESOURCE_ID,
                fields: fields,
                q: JSON.stringify({
                    [config.API_FIELDS.country]: country,
                }),
                limit: '32000',
            },
        })
        .then(({ data: records }: AxiosResponse) => {
            return records.map((record: { [key: string]: any }) => ({
                year: record[config.API_FIELDS.time_axis],
                sex: record[config.API_FIELDS.segment] || config.SEXES[0].id,
                value: formatValue(config, record[config.API_FIELDS.value]),
            }))
        });
};

export const fetchYearData = (config: ConfigType, year: number, sex: string) => {
    let query = JSON.stringify({
        [config.API_FIELDS.time_axis]: year.toString(),
    });
    if (config.API_FIELDS.segment && !(config.API_FIELDS.segment === '') && sex && !(sex === '')) {
        query = JSON.stringify({
            [config.API_FIELDS.time_axis]: year.toString(),
            [config.API_FIELDS.segment]: sex,
        });
    }
    return axios
        .get(config.DATASTORE_PATH, {
            params: {
                resource_id: config.RESOURCE_ID,
                q: query,
                fields: [config.API_FIELDS.country, config.API_FIELDS.value].join(','),
                limit: '32000',
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
};
