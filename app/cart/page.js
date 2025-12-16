"use client";

import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-hot-toast";

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
    if (newQuantity > 0) {
      toast.success("Jumlah item diperbarui");
    }
  };

  const handleRemoveItem = (id) => {
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} dihapus dari keranjang`);
    }
    removeFromCart(id);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Keranjang Anda kosong</h3>
            <p className="mt-1 text-gray-500">Tambahkan produk ke keranjang untuk melanjutkan.</p>
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/product/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Warna: {item.color || "Standar"}, Ukuran: {item.size || "Standar"}
                          </p>
                        </div>
                        
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Pesanan</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{formatPrice(subtotal)}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Ongkos Kirim</p>
                    <p className="text-gray-600">{formatPrice(shipping)}</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>{formatPrice(total)}</p>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Lanjutkan ke Pembayaran
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link href="/products" className="text-indigo-600 font-medium hover:text-indigo-500">
                      ← Lanjutkan Belanja
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}