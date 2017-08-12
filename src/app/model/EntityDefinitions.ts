// export class Stock {
//     id: number;
//     symbol: string;
//     open: number;
//     close: number;
//     high: number;
//     low: number;
//     volumn: number;
// }

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
    isCfd: boolean;
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
