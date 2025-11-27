/* EXERCISE after v3 */
import { Router } from "express";

const router = Router();

/* Just like when we add a class list to an object with .classList, 
with .get, we are adding the following code to the function expression router. 
Interestingly, the only thing that needs to be exported is router, not all of these additions. 

In my to-do list assignment, I was struggling with putting event listeners in modules because I didn't know how this works. */
router.get("/", (req, res) => {
    console.log("Sider til at imødekomme juridiske krav");
    res.send("Sider til at imødekomme juridiske krav");
});

router.get("/terms", (req, res) => {
    console.log("Dette er siden Handelsbetingelser...");
    res.send("Dette er siden Handelsbetingelser...");
});

router.get("/privacy", (req, res) => {
    console.log("Dette er siden Privatlivspolitik...");
    res.send("Dette er siden Privatlivspolitik...");
});

router.get("/payment", (req, res) => {
    console.log("Dette er siden Betalingsmidler...");
    res.send("Dette er siden Betalingsmidler...");
});

router.get("/delivery", (req, res) => {
    console.log("Dette er siden Levering...");
    res.send("Dette er siden Levering...");
});

router.get("/returns", (req, res) => {
    console.log("Dette er siden Levering...");
    res.send("Dette er siden Retur...");
});

router.get("/warranty", (req, res) => {
    console.log("Dette er siden Garanti og service...");
    res.send("Dette er siden Garanti og service...");
});

export { router as legalPagesRouter };

/* Copyright 2025, Marie-Pierre Lessard */