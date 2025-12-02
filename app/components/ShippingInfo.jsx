import React, { useState } from "react";

const ShippingInfo = ({ shippingInfo, setShippingInfo, lang = 'id' }) => {
  const t = {
    id: {
      title: 'Informasi Pengiriman',
      name: 'Nama Lengkap',
      email: 'Email',
      phone: 'Nomor Telepon',
      address: 'Alamat',
      city: 'Kota',
      postalCode: 'Kode Pos',
      notes: 'Catatan untuk Pengiriman (Opsional)',
    },
    en: {
      title: 'Shipping Information',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      notes: 'Delivery Notes (Optional)',
    }
  };

  const translations = t[lang] || t['id'];

  const handleChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{translations.title}</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
            {translations.name} *
          </label>
          <input
            type="text"
            id="name"
            value={shippingInfo.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              {translations.email} *
            </label>
            <input
              type="email"
              id="email"
              value={shippingInfo.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
              {translations.phone} *
            </label>
            <input
              type="tel"
              id="phone"
              value={shippingInfo.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
            {translations.address} *
          </label>
          <textarea
            id="address"
            value={shippingInfo.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
              {translations.city} *
            </label>
            <input
              type="text"
              id="city"
              value={shippingInfo.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-xs font-medium text-gray-700 mb-1">
              {translations.postalCode} *
            </label>
            <input
              type="text"
              id="postalCode"
              value={shippingInfo.postalCode || ''}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs font-medium text-gray-700 mb-1">
            {translations.notes}
          </label>
          <textarea
            id="notes"
            value={shippingInfo.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={lang === 'id' ? 'Catatan tambahan untuk kurir...' : 'Additional notes for the courier...'}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;