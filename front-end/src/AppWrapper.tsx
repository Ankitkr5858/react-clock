import App from "./App";
import { StateContextProvider } from "./Context";
import { BrowserRouter, Switch } from "react-router-dom";

//This component is wrapper over all the app. We render app inside this so no context will be available to all the app.
const AppWrapper: React.FC = () => {
   return (
      <StateContextProvider>
         <BrowserRouter>
            <Switch>
               <App></App>
            </Switch>
         </BrowserRouter>
      </StateContextProvider>
   );
};

export default AppWrapper;
