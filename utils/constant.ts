
export type OrderBook = {
    price: number,
    amount: number,
    total: number,
    count: number
}

export type AskProps = {
    asksData: OrderBook[]
}

export type BidsProps = {
    bidsData: OrderBook[]
}

export const URL = 'wss://api-pub.bitfinex.com/ws/2'

export const apiHeader = {
    event: "subscribe",
    channel: "book",
    symbol: "tBTCUSD",
}