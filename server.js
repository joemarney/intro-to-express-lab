const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("done");
});

app.get("/greetings/:username", (req, res) => {
  const name = req.params.username;
  res.send(`<h1>Nice to see you again, ${name}</h1>`);
});

app.get("/roll/:num", (req, res) => {
  const num = Number(req.params.num);
  if (isNaN(num)) {
    return res.send("You must specify a number");
  }
  const random = Math.floor(Math.random() * req.params.num);
  return res.send(`You rolled a ${random}`);
});

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:idx", (req, res) => {
  const idx = req.params.idx;
  if (collectibles[idx]) {
    return res.send(
      `So, you want the ${collectibles[idx].name}? For £${collectibles[idx].price}, it can be yours!`
    );
  }
  return res.send("This item is not yet in stock. Check back soon!");
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];
// app.get("/shoes", (req, res) => {
//   res.send(shoes);
// });

// const filteredByType = shoes.filter((item) => item.type === req.query.q);
// return res.send(filteredByType);

// const filteredByMaxPrice = shoes.filter((item) => item.price > req.query.q);
// return res.send(filteredByMaxPrice);

// const filteredByMinPrice = shoes.filter((item) => item.price < req.query.q);
// return res.send(filteredByMinPrice);

// Solution from Sam

app.get("/shoes", (req, res) => {
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];
  const type = req.query.type;

  const filtered = shoes.filter((shoe) => {
    // excludes shoes below a specified price

    // excludes shoes above a specified price

    // includes shoes of a specified type
    return (
      !(minPrice && shoe.price < minPrice) && // checks to see if the statement is invalid
      !(maxPrice && shoe.price > maxPrice) &&
      !(type && shoe.type !== type)
    );
  });
  return res.send(filtered);
});
