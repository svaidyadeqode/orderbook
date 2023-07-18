import { AskProps, OrderBook } from "@/utils/constant";
import classes from "./OrderBook.module.css";
import { calculateTotal } from "@/utils/common";
const Asks = ({ asksData }: AskProps) => {
  const askDataList = calculateTotal(asksData, 0);
  const askMaxTotal = askDataList[askDataList.length - 1]?.total;
  const tableData = (
    <table className={classes.tableClass}>
      <thead>
        <tr>
          <td>Price</td>
          <td>Total</td>
          <td>Amount</td>
          <td>Count</td>
        </tr>
      </thead>
      <tbody>
        {askDataList.map((ask: OrderBook, index: number) => {
          const value = (ask.total / askMaxTotal) * 100;
          return (
            <tr
              key={ask.price}
              style={{
                background: `linear-gradient(to right, #f7c6c6 ${0}%, red ${value}%,  white ${value}%, white ${100}%)`,
              }}
            >
              <td>{ask.price}</td>
              <td>{ask.total.toFixed(4)}</td>
              <td>{Number(ask.amount.toFixed(4)) * -1}</td>
              <td>{ask.count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return <>{tableData}</>;
};
export default Asks;
