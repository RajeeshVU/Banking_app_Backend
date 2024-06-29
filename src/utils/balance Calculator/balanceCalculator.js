export const balanceCalculator = (type, amount, balance) => {

    const numericAmount = parseFloat(amount);
    if (type === 'credit') {

      return balance + numericAmount;
    } else {
      return Math.abs(balance - numericAmount);
    }
  };