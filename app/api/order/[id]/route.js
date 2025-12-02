import { NextResponse } from 'next/server';

// Mock data for demonstration
const mockOrders = {
  '123': {
    transactionId: 'txn-1234567890',
    date: '2023-10-15T10:30:00Z',
    productName: 'LEVI\'S® WOMEN\'S XL TRUCKER JACKET',
    quantity: 1,
    amount: 350000,
    color: 'Biru',
    size: 'M' // Adding size information
  }
};

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // In a real application, you would fetch this from a database
    const order = mockOrders[id] || null;
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' }, 
      { status: 500 }
    );
  }
}