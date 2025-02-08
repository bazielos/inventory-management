import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Menu } from 'lucide-react';
import { loadProducts, saveProducts, deleteProduct, updateProduct } from './services/storage';
import { calculateTotalCost } from './utils/helpers';
import MobileMenu from './components/MobileMenu';
import AddProductForm from './components/AddProductForm';
import ProductsTable from './components/ProductsTable';
import Stats from './components/Stats';

const App = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showLowStock, setShowLowStock] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [currentView, setCurrentView] = useState('main');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const data = await loadProducts();
				setProducts(data);
			} catch (error) {
				console.error('Failed to load products:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleAddProduct = async (newProduct) => {
		try {
			const totalCost = calculateTotalCost(newProduct.pricePerUnit, newProduct.quantity);
			const savedProduct = await saveProducts({
				...newProduct,
				totalCost,
			});

			setProducts((prev) => [savedProduct, ...prev]);
			setCurrentView('main');
		} catch (error) {
			console.error('Failed to save product:', error);
			// Here you might want to show an error notification
		}
	};

	const handleQuantityChange = async (id, change) => {
		try {
			const product = products.find((p) => p.id === id);
			if (!product) return;

			const newQuantity = Math.max(0, parseInt(product.quantity) + change);
			const updatedProduct = {
				...product,
				quantity: newQuantity.toString(),
				totalCost: calculateTotalCost(product.pricePerUnit, newQuantity),
			};

			const result = await updateProduct(id, updatedProduct);

			setProducts((prev) => prev.map((p) => (p.id === id ? result : p)));
		} catch (error) {
			console.error('Failed to update product:', error);
			// Here you might want to show an error notification
		}
	};

	const handleDeleteProduct = async (id) => {
		try {
			await deleteProduct(id);
			setProducts((prev) => prev.filter((p) => p.id !== id));
		} catch (error) {
			console.error('Failed to delete product:', error);
			// Here you might want to show an error notification
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
					<p className="mt-4 text-gray-600">טוען מוצרים...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50" dir="rtl">
			<div className="bg-white shadow-sm">
				<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-xl font-bold">ניהול מלאי</h1>
					<button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden">
						<Menu size={24} />
					</button>
					<nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
						{['main', 'add', 'stats'].map((view) => (
							<button key={view} onClick={() => setCurrentView(view)} className="px-4 py-2 rounded hover:bg-gray-100">
								{view === 'main' ? 'מסך ראשי' : view === 'add' ? 'הוספת מוצר' : 'סטטיסטיקות'}
							</button>
						))}
					</nav>
				</div>
			</div>

			<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onViewChange={setCurrentView} />

			<div className="max-w-6xl mx-auto px-4 py-6">
				{currentView === 'main' && (
					<>
						<div className="mb-6 flex flex-wrap gap-4">
							<div className="flex-1 min-w-[200px] relative">
								<input
									type="text"
									placeholder="חיפוש מוצר..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full p-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500"
								/>
								<Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
							</div>
							<button
								onClick={() => setShowLowStock(!showLowStock)}
								className={`px-4 py-2 rounded flex items-center gap-2 ${
									showLowStock ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
								}`}
							>
								<AlertTriangle size={20} />
								הצג מלאי נמוך
							</button>
						</div>
						<ProductsTable
							products={products}
							searchTerm={searchTerm}
							showLowStock={showLowStock}
							onQuantityChange={handleQuantityChange}
							onDelete={handleDeleteProduct}
						/>
					</>
				)}

				{currentView === 'add' && <AddProductForm onSubmit={handleAddProduct} />}

				{currentView === 'stats' && <Stats products={products} />}
			</div>
		</div>
	);
};

export default App;
