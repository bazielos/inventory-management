export const calculateTotalCost = (pricePerUnit, quantity) => {
	return (parseFloat(pricePerUnit) * parseFloat(quantity)).toFixed(2);
};

export const isLowStock = (product) => {
	return parseInt(product.quantity) <= parseInt(product.minQuantity);
};

export const formatCurrency = (amount) => {
	return new Intl.NumberFormat('he-IL', {
		style: 'currency',
		currency: 'ILS',
	}).format(amount);
};
