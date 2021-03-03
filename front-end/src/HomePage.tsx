import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISlot } from "./Context";
import TimeSlot from "./TimeSlot";
import useStateContent from "./useStateContent";

const TimeSlotsTable = styled.table`
   /* display: flex; */
   /* flex-direction: column; */
   width: 50%;
   border-collapse: collapse;
   td {
      text-align: center;
      padding: 1rem 2rem;
   }
   box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.5);
`;
const TableHead = styled.th`
   /* display: flex;
   align-items: center;
   justify-content: center; */
   padding: 1rem 2rem;
   text-align: left;
   font-size: 1.5rem;
`;
const TableHeadingRow = styled.tr`
   background: #e7e7e7;
   box-shadow: 1px 1px 3px gray;
`;
export interface HomePageProps {}

console.log("hello");
const HomePage: React.FC<HomePageProps> = () => {
   const [state, dispatch] = useStateContent();
   return (
      <TimeSlotsTable>
         <colgroup>
            <col span={1} style={{ width: "5%" }} />
            <col span={1} style={{ width: "47.5%" }} />
            <col span={1} style={{ width: "47.5%" }} />
         </colgroup>

         <TableHeadingRow>
            <TableHead></TableHead>
            <TableHead style={{ textAlign: "center" }}>Start Time</TableHead>
            <TableHead style={{ textAlign: "center" }}>End Time</TableHead>
         </TableHeadingRow>
         {state.slots.map((sl, i) => (
            <TimeSlot serialNo={i} {...sl}></TimeSlot>
         ))}
      </TimeSlotsTable>
   );
};

export default HomePage;
