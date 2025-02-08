import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { isLowStock, formatCurrency } from '../utils/helpers';

const ProductsTable = ({ products = [], searchTerm, showLowStock, onQuantityChange, onDelete }) => {
	const filteredProducts =
		products?.filter((product) => {
			const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
			return showLowStock ? matchesSearch && isLowStock(product) : matchesSearch;
		}) || [];

	return (
		<div className="bg-white rounded-lg shadow overflow-x-auto">
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-right text-sm font-medium text-gray-500">שם המוצר</th>
						<th className="px-6 py-3 text-right text-sm font-medium text-gray-500">מחיר</th>
						<th className="px-6 py-3 text-right text-sm font-medium text-gray-500">כמות</th>
						<th className="px-6 py-3 text-right text-sm font-medium text-gray-500">פעולות</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{filteredProducts.map((product) => (
						<tr key={product.id} className="hover:bg-gray-50">
							<td className="px-6 py-4">
								{product.name}
								{isLowStock(product) && (
									<span className="mr-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
										מלאי נמוך
									</span>
								)}
							</td>
							<td className="px-6 py-4">{formatCurrency(product.pricePerUnit)}</td>
							<td className="px-6 py-4">
								<div className="flex items-center space-x-2 rtl:space-x-reverse">
									<button
										onClick={() => onQuantityChange(product.id, -1)}
										className="text-red-600 hover:bg-red-100 p-1 rounded"
									>
										<Minus size={16} />
									</button>
									<span className="w-12 text-center">{product.quantity}</span>
									<button
										onClick={() => onQuantityChange(product.id, 1)}
										className="text-green-600 hover:bg-green-100 p-1 rounded"
									>
										<Plus size={16} />
									</button>
								</div>
							</td>
							<td className="px-6 py-4">
								<button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-800">
									<Trash2 size={20} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductsTable;
