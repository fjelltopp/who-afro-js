import { ConfigType } from '../types';

export const formatValue = (config: ConfigType, value: number): string => {
    return parseFloat(value.toString()).toFixed(config.ROUND_TO_DECIMAL_PLACES);
};

export const getSexColour = (config: ConfigType, sexId: string): string => {
    const sex = config.SEXES.find((sex) => sex.id === sexId);
    return sex ? sex.color : '';
};

export const getSexLabel = (config: ConfigType, sexId: string): string => {
    const sex = config.SEXES.find((sex) => sex.id === sexId);
    return sex ? sex.label : '';
};
