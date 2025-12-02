import React from "react";

const PaymentMethods = ({ selectedMethod, setSelectedMethod, lang = 'id' }) => {
  const paymentMethods = [
    { id: 'credit_card', name: lang === 'id' ? 'Kartu Kredit' : 'Credit Card', icon: '💳' },
    { id: 'bank_transfer', name: lang === 'id' ? 'Transfer Bank' : 'Bank Transfer', icon: '🏦' },
    { id: 'e_wallet', name: lang === 'id' ? 'E-Wallet' : 'E-Wallet', icon: '📱' },
    { id: 'qris', name: 'QRIS', icon: '🧾' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        {lang === 'id' ? 'Metode Pembayaran' : 'Payment Method'}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            className={`p-3 border rounded-lg text-center transition-all ${
              selectedMethod === method.id
                ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedMethod(method.id)}
            aria-pressed={selectedMethod === method.id}
          >
            <span className="block text-xl mb-1">{method.icon}</span>
            <span className="text-sm font-medium text-gray-800">{method.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;