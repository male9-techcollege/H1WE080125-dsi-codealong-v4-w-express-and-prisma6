/* Additional exercise in v4 */
import { Router } from "express";
import { createRecord, getRecords, getRecord, updateRecord } from "../controllers/categoryController.js";

const router = Router();

router.post("/", createRecord);

router.get("/", getRecords);

/* Before exercise and codealong in version 4, the code to use was:
router.get("/:id", (req, res) => {
    const identifier = Number(req.params.id);
    // console.log(req.params.id);
    res.send(`Detaljer for ${identifier}`);
});
 */
router.get("/:id", getRecord);

router.put('/:id', updateRecord);

export { router as categoryRouter };

/* Copyright 2025, Marie-Pierre Lessard */