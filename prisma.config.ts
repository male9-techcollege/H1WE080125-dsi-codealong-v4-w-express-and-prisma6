// The importation below is from the instructions on Moodle and codealong 
import { defineConfig, env } from "prisma/config";
/* Without the following import, database creation does not work. This line was not on Moodle or in the codealong. 
It was in the instructions in the terminal. 
Heinz didn't know about this one. Why is it unnecessary to include from "source" in this line? Is it from "dotenv"? */
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
