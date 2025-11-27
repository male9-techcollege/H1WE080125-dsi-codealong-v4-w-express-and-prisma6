import { prisma } from "../../prisma.js";

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
                /* I left out soldOn. */
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
                /* I left out soldOn. */
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Fejl: Kunne ikke hente bil' });
    }
};

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
export const createRecord = async (req, res) => {
    // console.log(1234);
    /* The following works:
    console.log(req.body);
    res.send("Du har kaldt car med en POST-metode.");
    */
    console.log(req.body);

    /* The id field is excluded from the deconstructing assignment because it is populated automatically by the database according to what Heinz said in the codealong.
    I am excluding the createdAt field (from my exercise) because it should also be populated automatically with the default value.
    I could have excluded soldOn because this should not be populated when the car comes in the dealership, but once it is sold!
    However, it was good to experiment with dates. There was sth to learn.
    */
    /* The following works after entering the field names under Body > x-www-form-urlencoded in Postman (otherwise, the properties are said to be undefined since there is no request from an actual form):  */
    const { category, brand, make, model, year, trimLevel, generation, price, fuelType, used, soldOn } = req.body;
    //console.log(category);

    if (!category || !brand || !make || !model || !year || !trimLevel || !generation || !price || !fuelType || !used || !soldOn) {
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
                soldOn: new Date(soldOn)
            }
        });
        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Noget gik galt på serveren." });
    };
};

/* Copyright 2025, Marie-Pierre Lessard */