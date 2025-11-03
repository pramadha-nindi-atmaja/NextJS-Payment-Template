import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkout from '../app/components/Checkout';

// Mock the product module
jest.mock('../app/libs/product', () => ({
  product: {
    id: 1,
    price: 350000,
    name: 'Test Product'
  }
}));

describe('Checkout Component', () => {
  it('renders with initial quantity of 1', () => {
    render(<Checkout />);
    const quantityInput = screen.getByRole('spinbutton', { name: /jumlah produk/i });
    expect(quantityInput).toHaveValue(1);
  });

  it('updates quantity when clicking increase/decrease buttons', () => {
    render(<Checkout />);
    const increaseBtn = screen.getByRole('button', { name: /tambah jumlah/i });
    const decreaseBtn = screen.getByRole('button', { name: /kurangi jumlah/i });
    const quantityInput = screen.getByRole('spinbutton', { name: /jumlah produk/i });

    fireEvent.click(increaseBtn);
    expect(quantityInput).toHaveValue(2);

    fireEvent.click(decreaseBtn);
    expect(quantityInput).toHaveValue(1);
  });

  it('shows correct total price calculation', () => {
    render(<Checkout />);
    const totalPrice = screen.getByText(/total:/i);
    const increaseBtn = screen.getByRole('button', { name: /tambah jumlah/i });

    // Initial price
    expect(totalPrice).toHaveTextContent('Rp350.000');

    // Price after increasing quantity
    fireEvent.click(increaseBtn);
    expect(totalPrice).toHaveTextContent('Rp700.000');
  });

  it('disables buttons during loading state', async () => {
    render(<Checkout />);
    const checkoutBtn = screen.getByRole('button', { name: /checkout sekarang/i });
    const quantityInput = screen.getByRole('spinbutton', { name: /jumlah produk/i });

    fireEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(quantityInput).toBeDisabled();
      expect(checkoutBtn).toBeDisabled();
    });
  });
});