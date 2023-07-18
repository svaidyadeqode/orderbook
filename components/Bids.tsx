import { calculateTotal } from "@/utils/common";
import classes from "./OrderBook.module.css";
import { BidsProps, OrderBook } from "@/utils/constant";
const Bids = ({ bidsData }: BidsProps) => {
  const bidsDataList = calculateTotal(bidsData, 1);
  const bidMaxTotal = bidsDataList[bidsDataList.length - 1]?.total;
  const tableData = (
    <table className={classes.tableClass}>
      <thead>
        <tr>
          <td>Count</td>
          <td>Amount</td>
          <td>Total</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        {bidsDataList.map((bid: OrderBook, index: number) => {
          const value = (bid.total / bidMaxTotal) * 100;
          return (
            <tr
              key={bid.price}
              style={{
                background: `linear-gradient(to left, #9af08b ${0}%, rgb(102, 255, 179) ${value}%,  white ${value}%, white ${100}%)`,
              }}
            >
              <td>{bid.count}</td>
              <td>{bid.amount.toFixed(4)}</td>
              <td>{bid.total.toFixed(4)}</td>
              <td>{bid.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return <>{tableData}</>;
};
export default Bids;
