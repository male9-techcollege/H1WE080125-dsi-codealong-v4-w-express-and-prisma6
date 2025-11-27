import { prisma } from "../../prisma.js";

export const getRecords = async (req, res) => {
    try {
        /* "prisma.car.findMany() bruges til at hente alle rækker fra tabellen Car."
        https://moodle.techcollege.dk/course/section.php?id=282542 */
        const data = await prisma.brand.findMany({
            select: {
                id: true,
                name: true
                /* 1 field was left out. */
            },
            orderBy: {
                name: "asc"
            }
        });
        console.log("The brand controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`DB Fejl: Kunne ikke hente liste af brands`);
    };
};

export const getRecord = async (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'Id har ingen værdi' });
    };

    try {
        const data = await prisma.brand.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true
                /* 1 field was left out. */
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Fejl: Kunne ikke hente varemærke' });
    }
};

export const createRecord = async (req, res) => {
    console.log(req.body);

    const { name, logo } = req.body;

    if (!name || !logo) {
        return res.status(400).json({ error: "Alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.brand.create({
            data: {
                name,
                logo
            }
        });
        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Noget gik galt på serveren." });
    };
};

/* Copyright 2025, Marie-Pierre Lessard */