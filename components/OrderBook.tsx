import { useEffect, useState } from "react";
import classes from "./OrderBook.module.css";
import Bids from "./Bids";
import Asks from "./Asks";
import { OrderBook, URL, apiHeader } from "@/utils/constant";
import useWebSocket from "@/hooks/use-web-socket";
import { findOrderBook } from "@/utils/common";
const OrderBookComponent = () => {
  const [bids, setBids] = useState<OrderBook[]>([]);
  const [asks, setAsk] = useState<OrderBook[]>([]);
  const orderBookData: number[][] | any = useWebSocket(URL);

  useEffect(() => {
    if (orderBookData && orderBookData.length != 0) {
      if (orderBookData[0].constructor === Array) {
        let total = 0;
        const orderBookList = orderBookData.map((book: number[], i: number) => {
          total += Math.abs(book[2]);
          return {
            price: book[0],
            count: book[1],
            amount: book[2],
            total: total,
          };
        });
        setBidAskDataHandler(orderBookList);
      } else {
        updateHadler({
          price: orderBookData[0],
          count: orderBookData[1],
          amount: orderBookData[2],
          total: 0,
        });
      }
    }
  }, [orderBookData]);

  const addOrUpdateBidData = (book: OrderBook) => {
    setBids((prev) => {
      const index = findOrderBook(prev, book.price);
      const bidData = [...prev];
      if (index >= 0) {
        bidData[index] = book;
      } else {
        bidData.push(book);
      }
      return [...bidData];
    });
  };

  const deleteBidData = (book: OrderBook) => {
    setBids((prev) => {
      const index = findOrderBook(prev, book.price);
      const bidData = [...prev];
      bidData.splice(index, 1);
      return [...bidData];
    });
  };

  const addOrUpdateAskData = (book: OrderBook) => {
    setAsk((prev) => {
      const index = findOrderBook(prev, book.price);
      const askData = [...prev];
      if (index >= 0) {
        askData[index] = book;
      } else {
        askData.push(book);
      }
      return [...askData];
    });
  };

  const deleteAskData = (book: OrderBook) => {
    setAsk((prev) => {
      const index = findOrderBook(prev, book.price);
      const askData = [...prev];
      askData.splice(index, 1);
      return [...askData];
    });
  };

  const updateHadler = (book: OrderBook) => {
    const { count, amount } = book;
    if (count > 0) {
      if (amount > 0) {
        addOrUpdateBidData(book);
      } else if (amount < 0) {
        addOrUpdateAskData(book);
      }
    } else if (count < 0) {
      if (amount === 1) {
        deleteBidData(book);
      } else if (amount === -1) {
        deleteAskData(book);
      }
    }
  };

  const setBidAskDataHandler = (orderBookList: OrderBook[]) => {
    setBids(orderBookList.filter((book: OrderBook) => book.amount > 0));
    setAsk(orderBookList.filter((book: OrderBook) => book.amount < 0));
  };

  return (
    <div>
      <div className={classes.order}>
        <div>
          <Bids bidsData={bids} />
        </div>
        <div>
          <Asks asksData={asks} />
        </div>
      </div>
    </div>
  );
};
export default OrderBookComponent;
