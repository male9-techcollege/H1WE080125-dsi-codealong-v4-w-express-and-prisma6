/* EXERCISE after v3 */
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    console.log("Sider til afdelinger");
    res.send("Sider til afdelinger");
});

router.get("/jylland", (req, res) => {
    console.log("Sider til afdelinger i Jylland...");
    res.send("Sider til afdelinger i Jylland...");
});

router.get("/fyn", (req, res) => {
    console.log("Sider til afdelinger på Fyn...");
    res.send("Sider til afdelinger på Fyn...");
});

router.get("/sjaelland", (req, res) => {
    console.log("Sider til afdelinger på Sjælland...");
    res.send("Sider til afdelinger på Sjælland...");
});

export { router as dealershipRouter };

/* Copyright 2025, Marie-Pierre Lessard */