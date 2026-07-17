const utils = require('conducts');

const transactions = utils.getTransactions(10);

console.log(transactions);

const calculateTotalRevenue = () => {
  return transactions.reduce((sum, transaction) => {
    return sum + transaction.totalPrice;
  }, 0);
};

const getMostSoldProduct = () => {
  const productCount = {};

  transactions.forEach((transaction) => {
    productCount[transaction.product] =
      (productCount[transaction.product] || 0) + transaction.quantity;
  });

  return Object.entries(productCount).reduce((current, candidate) => {
    return candidate[1] > current[1] ? candidate : current;
  })[0];
};

const displaySummary = () => {
  console.log('\nTotal Revenue:', calculateTotalRevenue());
  console.log('Most Sold Product:', getMostSoldProduct());
};

setTimeout(() => {
  displaySummary();
  process.exit(0);
}, 3000);