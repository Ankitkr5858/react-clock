import React, { useEffect } from "react";
import { ISlot, StateContextProvider } from "./Context";
import HomePage from "./HomePage";
import "./App.css";
import styled from "styled-components";
import EditPage from "./EditPage";
import useStateContent from "./useStateContent";
import { Route } from "react-router-dom";

const PageWrapper = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   align-items: center;
   justify-content: center;
`;
const BackgroundImage = styled.img`
   position: absolute;
   z-index: -1;
   height: 100vh;
   width: 100vw;
   object-fit: cover;
   opacity: 0.5;
`;

function App() {
   const [state, dispatch] = useStateContent();

   //Whenever the activeSlotId will change(it will happen when page will change) then we want update our data from node api.
   useEffect(() => {
      //Making get request to main page of node server
      fetch("http://localhost:8000/", { mode: "cors" }).then(async (res) => {
         //We get response and convert it into json
         const data = await res.json();

         //Then fill all the slots to appear in your react app.
         dispatch({ updateAllSlots: data.slots as ISlot[] });
      });
   }, [state.activeSlotId]);
   return (
      <>
         <BackgroundImage
            src={
               "https://www.itl.cat/pngfile/big/74-749136_clocks-wallpaper-black-and-white.jpg"
            }
         ></BackgroundImage>
         <Route exact path="/">
            <PageWrapper>
               <HomePage></HomePage>
            </PageWrapper>
         </Route>
         <Route exact path="/edit">
            <PageWrapper>
               <EditPage></EditPage>
            </PageWrapper>
         </Route>
      </>
   );
}

export default App;
