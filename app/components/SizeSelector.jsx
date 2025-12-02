import React from "react";

const SizeSelector = ({ sizes, selectedSize, onSizeSelect, lang = 'id' }) => {
  const t = {
    id: {
      title: 'Ukuran',
      outOfStock: 'Stok habis'
    },
    en: {
      title: 'Size',
      outOfStock: 'Out of stock'
    }
  };

  const translations = t[lang] || t['id'];

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-700 mb-2">{translations.title}</h2>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.value}
            className={`px-3 py-1 text-sm rounded-md border transition-all ${
              selectedSize === size.value
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => onSizeSelect(size.value)}
            aria-pressed={selectedSize === size.value}
            disabled={size.outOfStock}
          >
            {size.label}
            {size.outOfStock && (
              <span className="block text-xs text-red-500 mt-1">
                {translations.outOfStock}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;