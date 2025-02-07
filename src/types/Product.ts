export interface Product {
	id: number;
	name: string;
	pricePerUnit: string;
	quantity: string;
	minQuantity: string;
	totalCost: string;
	lastUpdated: string;
}

export interface NewProduct {
	name: string;
	pricePerUnit: string;
	quantity: string;
	minQuantity: string;
}
