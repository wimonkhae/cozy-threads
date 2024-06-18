export default function formatCurrency(amount, fromCurrency) {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: fromCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    const formattedAmount = formatter.format(amount);
    return formattedAmount;
  }
  