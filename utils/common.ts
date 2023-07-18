import { OrderBook } from "./constant";

export const calculateTotal = (dataList: OrderBook[], sortDirection: number) => {
    let total = 0;
    const list = dataList
        .sort((a: any, b: any) => sortDirection === 1 ? b.price - a.price : a.price - b.price)
        .map((book: any, i: number) => {
            total += Math.abs(book.amount);
            return {
                price: book.price,
                count: book.count,
                amount: book.amount,
                total: total,
            };
        });
    return list.slice(0, 25);
};

export const findOrderBook = (orderBookList: OrderBook[], price: number) => {
    return orderBookList.findIndex(
        (orderBook: OrderBook) => orderBook.price === price
    );
}

// const updateBidAtSpecificIndex = (
//     index: number,
//     dataList: number[],
//     updateData: number[]
// ): any => {
//     return [...dataList.slice(0, index), updateData, ...dataList.slice(index)];
// };