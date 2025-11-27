/* TO DO in various routes files, CRUD:
DONE: router.get("/"", getRecords);
DONE OR PARTLY DONE: router.get("/:id", getRecord);
DONE: router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
*/

/* Named import from express */
import { Router } from "express";
import { getRecords, getRecord, createRecord } from "../controllers/carController.js";

/* The purpose of the following is to avoid repetition on sites with lots of pages. */
const router = Router();

/* Up to v3, the codealong said:
router.get("/", (req, res) => {
    console.log("Liste af biler");
    res.send("Liste af brugte biler");
});

Notes about that code:
In index.js, /cars is given as the end point that is simply called / (a root) here. It's the root of this particular router. 
The point is to be able to efficiently subdivide by brand, etc. 

.send() :
"I praksis ville man normalt sende et HTTP-svar eller kalde en controller."
https://moodle.techcollege.dk/course/section.php?id=284745
*/

//Thanks to Express, it is not necessary to include the arguments (req, res) (matching the params in function expression) (unlike in the code in comment above). Express does it for us.
router.get("/", getRecords);

/* Dynamic values: e.g. :id (no dollar sign here) 
Before exercise and codealong in version 4, the code to use was:
router.get("/:id", (req, res) => {
    const identifier = Number(req.params.id);
    // console.log(req.params.id);
    res.send(`Bildetaljer for ${identifier}`);
});
*/
router.get("/:id", getRecord);

/* Since this uses the method POST instead of GET, there is no problem reusing the base URL for cars. */
router.post("/", createRecord);

/* Function expression "router" exported as an alias (carRouter). 
Other version on Moodle:
export const carRouter = router */
export { router as carRouter };

/* Copyright 2025, Marie-Pierre Lessard */