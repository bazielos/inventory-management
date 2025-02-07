import React from 'react';
import { X } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, onViewChange }) => (
  <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4">
        <button onClick={onClose} className="absolute left-4 top-4">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6">תפריט</h2>
        <nav className="space-y-4">
          {['main', 'add', 'stats'].map(view => (
            <button 
              key={view}
              onClick={() => { onViewChange(view); onClose(); }}
              className="block w-full text-right py-2 hover:bg-gray-100 rounded px-2"
            >
              {view === 'main' ? 'מסך ראשי' : view === 'add' ? 'הוספת מוצר' : 'סטטיסטיקות'}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

export default MobileMenu; 