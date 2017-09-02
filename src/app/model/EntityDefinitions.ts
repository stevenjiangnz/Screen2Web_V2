export class StateEvent {
    shareId: number;
    currentDate: number;
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

export class Node {
    id: string;
    name: string;
    Children?: Node[];
}

export class Token {
    token: string;
    tokeType: string;
    expiresIn: number;
}
