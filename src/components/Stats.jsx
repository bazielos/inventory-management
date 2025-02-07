import React from 'react';
import { formatCurrency } from '../utils/helpers';

const Stats = ({ products }) => {
  const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.pricePerUnit) * parseFloat(p.quantity)), 0);
  const lowStockCount = products.filter(p => parseInt(p.quantity) <= parseInt(p.minQuantity)).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">סטטיסטיקות</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">סיכום כללי</h3>
          <p>מספר מוצרים: {products.length}</p>
          <p>שווי מלאי כולל: {formatCurrency(totalValue)}</p>
          <p>מוצרים במלאי נמוך: {lowStockCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats; 