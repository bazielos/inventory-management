const STORAGE_KEY = 'inventory-products';

export const loadProducts = () => {
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved ? JSON.parse(saved) : [];
};

export const saveProducts = (products) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};
