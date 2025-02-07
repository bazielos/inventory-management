import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const AddProductForm = ({ onSubmit }) => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		pricePerUnit: '',
		quantity: '',
		minQuantity: '5',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(newProduct);
		setNewProduct({ name: '', pricePerUnit: '', quantity: '', minQuantity: '5' });
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-xl font-semibold mb-4">הוספת מוצר חדש</h2>
			<div className="space-y-4">
				{[
					{ label: 'שם המוצר', name: 'name', type: 'text' },
					{ label: 'מחיר ליחידה', name: 'pricePerUnit', type: 'number', step: '0.01' },
					{ label: 'כמות במלאי', name: 'quantity', type: 'number' },
					{ label: 'כמות מינימום', name: 'minQuantity', type: 'number' },
				].map((field) => (
					<div key={field.name}>
						<label className="block text-sm font-medium mb-1">{field.label}</label>
						<input
							type={field.type}
							value={newProduct[field.name]}
							onChange={(e) => setNewProduct({ ...newProduct, [field.name]: e.target.value })}
							className="w-full p-2 border rounded"
							required
							step={field.step}
							min="0"
						/>
					</div>
				))}
				<button
					type="submit"
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
				>
					<PlusCircle size={20} />
					הוסף מוצר
				</button>
			</div>
		</form>
	);
};

export default AddProductForm;
