"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const dummyOrders = [
  {
    id: "ORD-001",
    date: "2023-11-15",
    status: "Dikirim",
    total: 850000,
    items: [
      { name: "LEVI'S® WOMEN'S XL TRUCKER JACKET", quantity: 1, price: 350000 },
      { name: "ADIDAS Running Shoes", quantity: 1, price: 500000 }
    ]
  },
  {
    id: "ORD-002",
    date: "2023-10-22",
    status: "Selesai",
    total: 150000,
    items: [
      { name: "ZARA Basic Cotton T-Shirt", quantity: 2, price: 150000 }
    ]
  },
  {
    id: "ORD-003",
    date: "2023-09-05",
    status: "Dibatalkan",
    total: 250000,
    items: [
      { name: "H&M Slim Fit Chino Pants", quantity: 1, price: 250000 }
    ]
  }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const getStatusClass = (status) => {
  switch (status) {
    case "Dikirim":
      return "bg-blue-100 text-blue-800";
    case "Selesai":
      return "bg-green-100 text-green-800";
    case "Dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    // If user is not authenticated, redirect to login
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Pesanan</h1>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-500">
            ← Lanjutkan Belanja
          </Link>
        </div>
        
        {dummyOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Belum ada pesanan</h3>
            <p className="mt-1 text-gray-500">Anda belum melakukan pembelian apapun.</p>
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Mulai Belanja
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {dummyOrders.map((order) => (
                <li key={order.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pesanan #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="ml-4 text-sm font-medium text-gray-900">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Item:</h4>
                    <ul className="mt-2 space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{item.name} × {item.quantity}</span>
                          <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Lihat Detail
                    </button>
                    {order.status === "Selesai" && (
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                        Beli Lagi
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}