import { prisma } from "../../prisma.js";

/* The following code stems from a codealong. It's JavaScript.
Heinz updated the instructions on Moodle (https://moodle.techcollege.dk/course/section.php?id=282545) after giving up on using Prisma 7. The instructions are now for TypeScript, which is a superset of JavaScript acc. to various online sources, incl. https://stackoverflow.com/questions/29918324/is-typescript-really-a-superset-of-javascript 
"A superset is a language that includes all of the features of another language, as well as additional features. (...)
TypeScript adds functionality to JavaScript, including:
Early error detection (...)
Code consistency (...)
Scalability (...)
Tooling (...)
Your TypeScript is compiled into JavaScript so that your browser can parse it."
https://www.epicweb.dev/what-is-a-superset-in-programming
*/
/**
 * Method Create Record
 * @param req 
 * @param res 
 * @returns Object
Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const createRecord = async (req, res) => {
    // console.log(1234);
    /* The following works:
    console.log(req.body);
    res.send("Du har kaldt car med en POST-metode.");
    */
    console.log(req.body);

    /* The id field is excluded from the deconstructing assignment because it is populated automatically by the database according to what Heinz said in the codealong.
    I am excluding the createdOn field (from my exercise) because it should also be populated automatically with the default value.
    I could have excluded updatedOn for the sake of logic. However, it was good to experiment with dates. There was sth to learn.
    */
    /* The following works after entering the field names under Body > x-www-form-urlencoded in Postman (otherwise, the properties are said to be undefined since there is no request from an actual form):  */
    const { category, brand, make, model, year, trimLevel, generation, price, fuelType, used, updatedOn } = req.body;
    //console.log(category);

    if (!category || !brand || !make || !model || !year || !trimLevel || !generation || !price || !fuelType || !used || !updatedOn) {
        return res.status(400).json({ error: "Alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.car.create({
            data: {
                category,
                brand,
                make,
                model,
                /* When testing with Postman, everything coming to the API is a string, so it is necessary to convert to a JS data type. 
                Even though MySQL database uses format YYYY-MM-DD HH:MM:SS for dates, the JS data type doesn't need to be converted to that.
                Heinz thinks Prisma takes care of the conversion.
                */
                year: Number(year),
                trimLevel,
                generation,
                price: Number(price),
                fuelType,
                used: Boolean(used),
                /* Normalisation rules (normal forms)
                There are rules in database design acc. to which: 
                - data should not be repeated;
                - no field should be empty. 
                This is to reduce errors (e.g. typos) and keep database size down. 
                For instance, a relation can be created to a table that contains the options in a select menu in a form that populates the database. 
                If some fields are optional, they should be in a table where rows only get created if the field is populated. 
                Exceptions are often made for names (first and last) and addresses, but there can be separate tables for city names, which can be automatically provided when users give their postal code, for instance. */
                updatedOn: new Date(updatedOn)
            }
        });
        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Noget gik galt på serveren." });
    };
};

/**
 * Method Get Records
 * @param req 
 * @param res 
 * @returns Array
 Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const getRecords = async (req, res) => {
    try {
        /* "prisma.car.findMany() bruges til at hente alle rækker fra tabellen Car."
        https://moodle.techcollege.dk/course/section.php?id=282542 
        Even though the spelling is Car in file schema.prisma, the following does not work unless the majuscule is dropped. */
        const data = await prisma.car.findMany({
            select: {
                id: true,
                category: true,
                brand: true,
                make: true,
                model: true,
                year: true,
                trimLevel: true,
                generation: true,
                price: true,
                fuelType: true,
                used: true
                /* I left out createdOn and updatedOn. */
            },
            orderBy: {
                price: "desc"
            }
        });
        console.log("The car controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`DB Fejl: Kunne ikke hente liste af biler`);
    };
};

/**
 * Method Get Record
 * @param req 
 * @param res 
 * @returns Object
Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
*/
export const getRecord = async (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'Id har ingen værdi' });
    };

    try {
        const data = await prisma.car.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                category: true,
                brand: true,
                make: true,
                model: true,
                year: true,
                trimLevel: true,
                generation: true,
                price: true,
                fuelType: true,
                used: true
                /* I left out createdOn and updatedOn. */
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Fejl: Kunne ikke hente bil' });
    }
};

export const updateRecord = async (req, res) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)

    const id = Number(req.params.id);
    const { category, brand, make, model, year, trimLevel, generation, price, fuelType, used, createdOn, updatedOn } = req.body; // Deconstruerer form body objektet

    if (!id) {
        return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
    };

    if (!category || !brand || !make || !model || !year || !trimLevel || !generation || !price || !fuelType || !used || !createdOn || !updatedOn) {
        return res.status(400).json({ error: 'Alle felter skal udfyldes' });
    };

    try {
        const data = await prisma.car.update({
            where: { id },
            data: {
                category,
                brand,
                make,
                model,
                year: Number(year),
                trimLevel,
                generation,
                price: Number(price),
                fuelType,
                used: Boolean(used),
                createdOn: new Date(createdOn),
                updatedOn: new Date(updatedOn)
            }
        });

        return res.status(201).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Noget gik galt i serveren' });
    };
};

export const deleteRecord = async (req, res) => {
    //const id = Number(req.params.id)
    //console.log(id);

    const id = Number(req.params.id)

    try {
        await prisma.car.delete({
            where: { id },
        });

        res.status(200).json({ message: `Bil nr. ${id} er slettet` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kunne ikke slette bilen' });
    }
};

/* Copyright 2025, Marie-Pierre Lessard */