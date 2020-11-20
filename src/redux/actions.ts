export enum ACTIONS_TYPE {
    CHANGE_CURRENCY_FIELD_TYPE = 'CurrencyExchange/CHANGE_CURRENCY_FIELD_TYPE',
    CHANGE_CHANGE_ACTION = 'CurrencyExchange/CHANGE_CHANGE_ACTION',
    CHANGE_CURRENT_CURRENCY = 'CurrencyExchange/CHANGE_CURRENT_CURRENCY',
}

// export type ChangeCurrencyFieldType = {};
export const changeCurrencyFieldAC = (amountOfBYN: string, amountOfCurrency: string) => {
    return {type: ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE, amountOfBYN, amountOfCurrency} as const
};

// export type ChangeAction = {};
export const changeActionAC = (isBuying: boolean) => {
    return {type: ACTIONS_TYPE.CHANGE_CHANGE_ACTION, isBuying} as const
};

// export type ChangeCurrentCurrencyType = {};
export const changeCurrentCurrencyAC = (currentCurrency: string) => {
    return {type: ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY, currentCurrency} as const
};

export type CurrencyReducersTypes =
    | ReturnType<typeof changeCurrencyFieldAC>
    | ReturnType<typeof changeActionAC>
    | ReturnType<typeof changeCurrentCurrencyAC>;
