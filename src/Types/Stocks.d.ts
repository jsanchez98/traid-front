export interface Datapoint {
    c: number,
    h:number,
    l:number,
    n:number,
    o:number,
    t:number,  
    v:number,
    vw:number,
}

export interface Ticker {
    ticker: string,
    name: string,
    market: string,
    locale: string,
    primary_exchange: string,
    type: string,
    active: string,
    currency_name: string,
    cik: number,
    composite_figi: string,
    share_class_figi: string,
    last_updated_utc: string,
}