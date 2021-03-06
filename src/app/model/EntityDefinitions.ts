export class Node {
    id: string;
    name: string;
    Children?: Node[];
}

export class StateEvent {
    shareId: number;
    eventType: string;
    data: any;
}

export class Share {
    id: number;
    symbol: string;
    name: string;
    industry: string;
    sector: string;
    isActive: boolean;
    isYahooVerified: boolean;
    lastProcessed: string;
    processComment?: string;
    iscfd: boolean;
    shareType: string;
    marketId: number;
    market?: string;
}

export class Ticker {
    tradingDate: number;
    open: number;
    close: number;
    high: number;
    low: number;
    volumn: number;
    adjustedClose: number;
    jsTicks: number;
    shareId: number;
    share: any;
    id: number;
}

export class Token {
    token: string;
    tokeType: string;
    expiresIn: number;
}

export class Zone {
    public id: number;
    public name: string;
    public isCurrent: boolean;
    public tradingDate: number;
    public startDate: number;
    public endDate?: number;
}