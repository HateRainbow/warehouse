import mongoose from "mongoose";
import env from "./src/env";
import { ItemInsert } from "./src/model/item";
import { faker } from "@faker-js/faker";

mongoose.connect(env.DB_URL).catch((e) => console.error(e));

async function seed() {
  console.log("Creating data...");
  const items: ItemInsert[] = Array.from({ length: 30 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 0, max: 500 }),
    price: Number(faker.commerce.price()),
    location: faker.location.city(),
  }));
  console.log("drop items collection");

  await mongoose.connection
    .collection("items")
    .drop()
    .catch((e) => {
      console.error("Error dropping items collection (it might not exist):", e);
    });
  console.log("Inserting new items...");
  await mongoose.connection.collection("items").insertMany(items);
  console.log("Seeding completed");
  process.exit(0);
}

seed();
