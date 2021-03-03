import { ISlot } from "./Context";
import Clock, { ClockProps } from "react-clock";
import "react-clock/dist/Clock.css";
import styled from "styled-components";
import useStateContent from "./useStateContent";
import { useHistory } from "react-router-dom";

const TimeSlotWrapper = styled.tr<{ isFilled?: boolean }>`
   box-shadow: 0px 0px 2px gray;
   transition: transform 0.3s ease-in-out;
   background-color: ${(p) =>
      p.isFilled ? "#ff8c8c" : "rgba(255, 255, 255, 0.9)"};

   font-size: 1.2rem;
   cursor: pointer;
   &:hover {
      transform: scale(1.11);

      z-index: 5;
   }
   td {
      vertical-align: middle;
   }
`;
const TimeLabelWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-around;
`;

//Just the styles for the clock
const clockProps: ClockProps = {
   value: new Date(),
   renderSecondHand: false,
   size: 40,
   renderHourMarks: true,
   hourMarksLength: 15,
   hourMarksWidth: 1,
   renderMinuteMarks: false,
   hourHandLength: 55,
   hourHandWidth: 2,
   minuteHandWidth: 1,
};

const TimeSlot: React.FC<ISlot & { serialNo: number }> = ({
   endHour,
   startHour,
   id,
   user,
   serialNo,
}) => {
   const [state, dispatch] = useStateContent();
   const history = useHistory();
   //When any of the slot will be clicked
   const onTimeSlotClick = () => {
      //Call the editTimeSlot action which will set "activeTimeSlot" equal to the id of the slot clicked
      dispatch({ editTimeSlot: id });

      //Move to edit page.
      history.push("/edit");
   };
   return (
      //isFilled will determine the color of the slot 'red' or 'white'
      <TimeSlotWrapper isFilled={Boolean(user)} onClick={onTimeSlotClick}>
         <td>{serialNo + 1}.</td>
         <td>
            <TimeLabelWrapper>
               <div>{converTime(startHour)} </div>
               {/* To create the clock for the time */}
               <Clock
                  {...clockProps}
                  value={new Date((startHour - 5) * 60 * 60 * 1000)}
               />
            </TimeLabelWrapper>
         </td>
         <td>
            <TimeLabelWrapper>
               <div>{converTime(endHour)}</div>

               <Clock
                  {...clockProps}
                  value={new Date((endHour - 5) * 60 * 60 * 1000)}
               />
            </TimeLabelWrapper>
         </td>
      </TimeSlotWrapper>
   );
};

//This function will convert militarty time to normal time.
// 16 => 4 PM
// 9 => 9 AM
export const converTime = (time: number) => {
   let prefix = time > 12 ? "PM" : "AM";
   let hour = time % 12 === 0 ? 12 : time % 12;
   return `${hour}:00 ${prefix}`;
};

export default TimeSlot;
