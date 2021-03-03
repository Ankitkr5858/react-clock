import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TimeSlot, { converTime } from "./TimeSlot";
import useStateContent from "./useStateContent";

export const EditPageWrapper = styled.div`
   background-color: white;
   width: 50%;
   display: flex;
   flex-direction: column;
   padding: 2rem 5rem;
`;

export const Input = styled.input`
   font-size: 1.2rem;
   padding: 1rem 2rem;
   border: none;
   outline: none;
   border-bottom: 1px solid gray;
   margin-bottom: 1rem;
`;
export const EditPageTitle = styled.div`
   font-size: 2rem;
   text-align: center;
   font-weight: bold;
   margin-bottom: 2rem;
`;

export const Footer = styled.div`
   margin-top: 2rem;
   display: flex;
`;

export const Button = styled.button<{ color: string }>`
   font-size: 1.5rem;
   padding: 1rem;
   width: 50%;
   &:first-child {
      margin-right: 1rem;
   }
   border: 2px solid ${(p) => p.color};
   outline: none;
   border-radius: 5px;
   color: ${(p) => p.color};
   background-color: transparent;
   transition: all 0.5s ease-out;
   cursor: pointer;
   &:hover {
      color: white;
      background: ${(p) => p.color};
   }
`;

const EditPage: React.FC = () => {
   const [state, dispatch] = useStateContent();

   //Get the slot which is the active slot.
   const activeSlot = state.slots.find((x) => x.id === state.activeSlotId);

   //Three state variables which will control the three inputs of edit page.
   /*We set their inital values to corresponding fields of slot so
   if there is already a user on a slot its data should ger pre-populated(Pont-3)*/
   const [firstName, setFirstName] = useState(activeSlot?.user?.firstName);
   const [lastName, setLastName] = useState(activeSlot?.user?.lastName);
   const [phoneNumber, setPhoneNumber] = useState(
      activeSlot?.user?.phoneNumber
   );

   //useHistory is used to change the pages from "/edit" to '/'(home page)
   const history = useHistory();

   //A function which will called when save button will be clicked
   const onSaveButtonClick = (e: React.MouseEvent) => {
      //We make the post request. This will change 'user' in the main node server
      fetch("http://localhost:8000/save", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         mode: "cors",
         body: JSON.stringify({
            id: activeSlot!.id,
            user: { firstName, lastName, phoneNumber },
         }),
      });

      //We call this function so that effect would run again and api in <App> compoent will be called again to update slots
      dispatch({ saveTimeSlot: "" });

      //Redirect to main page.
      history.push("/");
   };
   const onCancelButtonClick = (e: React.MouseEvent) => {
      //Same as above
      dispatch({ saveTimeSlot: "" });

      //Redirect to main page
      history.push("/");
   };
   return (
      <EditPageWrapper>
         <EditPageTitle>
            {converTime(activeSlot?.startHour || 0)}
            {"     "}-{"     "}
            {converTime(activeSlot?.endHour || 1)}
         </EditPageTitle>
         <Input
            placeholder="First name"
            value={firstName || ""}
            onChange={(e) => setFirstName((e.target as HTMLInputElement).value)}
         ></Input>
         <Input
            placeholder="Last name"
            value={lastName || ""}
            onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
         ></Input>
         <Input
            placeholder="Phone number"
            value={phoneNumber || ""}
            onChange={(e) =>
               setPhoneNumber((e.target as HTMLInputElement).value)
            }
         ></Input>
         <Footer>
            <Button onClick={onSaveButtonClick} color="green">
               Save
            </Button>
            <Button onClick={onCancelButtonClick} color="red">
               Cancel
            </Button>
         </Footer>
      </EditPageWrapper>
   );
};

export default EditPage;
