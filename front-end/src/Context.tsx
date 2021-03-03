import * as React from "react";
import { updateSourceFile } from "typescript";

//Structure for user
interface IUser {
   firstName: string;
   lastName: string;
   phoneNumber: string;
}

//Data structure of each slot
export interface ISlot {
   startHour: number;
   endHour: number;
   id: number;
   user: null | IUser;
}

//Structure of the complete state of whole program
export interface IState {
   slots: ISlot[];
   activeSlotId: number;
}

//Initial state
export const initialState: IState = {
   slots: [], //Slots are currently empty in the start and will be filled by called fetch call the the node server
   activeSlotId: -1, //Active slot will be the id of the slot which is being editied. Initially no slot is being edited so its -1
};

//These are all the actions which we will call from different parts of program.
type ActionType = {
   saveTimeSlot: any;
   editTimeSlot: number;
   updateAllSlots: ISlot[];
};

type ActionName = keyof ActionType;

//Functions for each of the action are below
export const functions: {
   [k in ActionName]: (state: IState, data: ActionType[k]) => IState;
} = {
   updateAllSlots: (state, slots) => ({ ...state, slots }),
   saveTimeSlot: (state) => ({ ...state, activeSlotId: -1 }),
   editTimeSlot: (state, slotId) => ({ ...state, activeSlotId: slotId }),
};

//This is the reducer function which apply changes according to type of action called and then return the updated state
const reducer = (state: IState, data: Partial<ActionType>): IState => {
   let tempState: IState = state;
   for (let key in data) {
      key = key as ActionName;
      const func = functions[key as ActionName];
      const dataToPass = (data as any)[key];
      tempState = func(tempState, dataToPass);
   }
   return tempState;
};

//If you don't know context. Context allow us to have some data avaiable to all the components whenever needed.
//Here we have two things in your context. The state of the program and the dispatch function.
//Dispatch function allow us to call the do any action(which we create above) from any part of program.
//Type for the main context.
type IStateContext = [IState, React.Dispatch<Partial<ActionType>>];

//Initial state of context.
const initialContext: IStateContext = [initialState, () => {}];
export const StateContext = React.createContext(initialContext);

//This is wrapper component which will provide context to all of the components inside it.
export const StateContextProvider: React.FC = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducer, initialState);

   return (
      //Here we pass the data of the context
      <StateContext.Provider value={[state, dispatch]}>
         {children}
      </StateContext.Provider>
   );
};
export const x = 3;
