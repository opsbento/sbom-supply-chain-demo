const { nanoid } = require("nanoid");

const transactions = [
  { product: "Notebook", quantity: 2, totalPrice: 24 },
  { product: "Pen", quantity: 5, totalPrice: 10 },
  { product: "Notebook", quantity: 1, totalPrice: 12 },
  { product: "Marker", quantity: 3, totalPrice: 15 },
  { product: "Pen", quantity: 4, totalPrice: 8 },
  { product: "Stapler", quantity: 1, totalPrice: 18 },
  { product: "Notebook", quantity: 2, totalPrice: 24 },
  { product: "Envelope", quantity: 6, totalPrice: 12 },
  { product: "Pen", quantity: 3, totalPrice: 6 },
  { product: "Marker", quantity: 2, totalPrice: 10 },
].map((transaction) => ({
  id: nanoid(8),
  ...transaction,
}));

function calculateTotalRevenue(items) {
  return items.reduce((sum, transaction) => sum + transaction.totalPrice, 0);
}

function getMostSoldProduct(items) {
  const productCount = {};

  for (const transaction of items) {
    productCount[transaction.product] =
      (productCount[transaction.product] || 0) + transaction.quantity;
  }

  return Object.entries(productCount).reduce((current, candidate) => {
    return candidate[1] > current[1] ? candidate : current;
  })[0];
}

function displaySummary(items) {
  console.log(items);
  console.log("\nTotal Revenue:", calculateTotalRevenue(items));
  console.log("Most Sold Product:", getMostSoldProduct(items));
}

setTimeout(() => {
  displaySummary(transactions);
  process.exit(0);
}, 3000);
