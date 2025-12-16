"use client";

import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    // If user is not authenticated, redirect to login
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profil Pengguna</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Informasi pribadi Anda</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Informasi Akun</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Nama</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Aktivitas</h4>
                <div className="space-y-2">
                  <Link href="/orders" className="block text-sm text-indigo-600 hover:text-indigo-500">
                    Riwayat Pesanan
                  </Link>
                  <Link href="/wishlist" className="block text-sm text-indigo-600 hover:text-indigo-500">
                    Daftar Keinginan
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}