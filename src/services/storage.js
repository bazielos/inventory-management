import { supabase } from '../config/database';

export const loadProducts = async () => {
	try {
		const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

		if (error) throw error;

		return (
			data.map((product) => ({
				...product,
				pricePerUnit: product.price_per_unit,
				createdAt: product.created_at,
				updatedAt: product.updated_at,
				totalCost: product.total_cost,
			})) || []
		);
	} catch (error) {
		console.error('Error loading products:', error);
		return [];
	}
};

export const saveProducts = async (product) => {
	try {
		const { data, error } = await supabase
			.from('products')
			.insert([
				{
					name: product.name,
					quantity: product.quantity,
					price_per_unit: product.pricePerUnit,
					description: product.description,
					total_cost: product.totalCost,
				},
			])
			.select()
			.single();

		if (error) throw error;

		return {
			...data,
			pricePerUnit: data.price_per_unit,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			totalCost: data.total_cost,
		};
	} catch (error) {
		console.error('Error saving product:', error);
		throw error;
	}
};

export const deleteProduct = async (productId) => {
	try {
		const { error } = await supabase.from('products').delete().eq('id', productId);

		if (error) throw error;
	} catch (error) {
		console.error('Error deleting product:', error);
		throw error;
	}
};

export const updateProduct = async (productId, updates) => {
	try {
		const { data, error } = await supabase
			.from('products')
			.update({
				name: updates.name,
				quantity: updates.quantity,
				price_per_unit: updates.pricePerUnit,
				description: updates.description,
				total_cost: updates.totalCost,
				updated_at: new Date().toISOString(),
			})
			.eq('id', productId)
			.select()
			.single();

		if (error) throw error;

		return {
			...data,
			pricePerUnit: data.price_per_unit,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			totalCost: data.total_cost,
		};
	} catch (error) {
		console.error('Error updating product:', error);
		throw error;
	}
};
