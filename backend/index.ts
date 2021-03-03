
import express, { Response, Request } from "express";
import { reduceEachLeadingCommentRange } from "typescript";
const app = express();
interface IUser {
   firstName: string;
   lastName: string;
   phoneNumber: string;
}
interface ISlot {
   startHour: number;
   endHour: number;
   id: number;
   user: null | IUser;
}
let allowCrossDomain = function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "*");
   next();
};
app.use(allowCrossDomain);
const slots: ISlot[] = [];
function fillSlots(startingHour: number, endingHour: number) {
   for (let i = startingHour; i < endingHour; i++) {
      const newSlot: ISlot = {
         startHour: i,
         endHour: i + 1,
         id: i,
         user: null,
      };
      slots.push(newSlot);
   }
}
fillSlots(9, 17);

app.use(express.json());
app.listen(8000, () => {
   console.log("listening on port 8000");
});
app.get("/", (req, res: Response) => {
   res.json({ slots });
});

app.post(
   "/save",
   (req: Request<{}, {}, { user: IUser; id: number }>, res: Response) => {
      console.log("Save request");
      console.log(req.body.user);
      const indexToChange = slots.findIndex((s) => s.id === req.body.id);
      slots[indexToChange] = { ...slots[indexToChange], user: req.body.user };
      res.send("User is added to the time slot");
   }
);
