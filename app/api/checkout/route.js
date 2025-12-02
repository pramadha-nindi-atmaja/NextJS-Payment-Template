import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

// Initialize Midtrans client
let snap = new midtransClient.Snap({
  isProduction: false, // Set to true for production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request) {
  try {
    const { productId, quantity, subtotal, discountAmount, total, selectedColor, selectedMethod, shippingInfo, couponDiscount } = await request.json();
    
    // Generate order ID
    const orderId = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Prepare item details
    const itemDetails = [{
      "id": productId,
      "price": subtotal / quantity,
      "quantity": quantity,
      "name": `Product ${productId}`,
      "brand": "Your Brand",
      "category": "Category",
      "merchant_name": "Your Merchant Name",
      "color": selectedColor
    }];
    
    // Add discount as a separate item if applicable
    if (couponDiscount && discountAmount > 0) {
      itemDetails.push({
        "id": "discount",
        "price": -discountAmount,
        "quantity": 1,
        "name": `Discount (${couponDiscount}%)`,
        "merchant_name": "Your Merchant Name"
      });
    }
    
    // Prepare transaction parameters
    let parameter = {
      "transaction_details": {
        "order_id": orderId,
        "gross_amount": total
      },
      "item_details": itemDetails,
      "customer_details": {
        "first_name": shippingInfo.name.split(' ')[0],
        "last_name": shippingInfo.name.split(' ').slice(1).join(' ') || " ",
        "email": shippingInfo.email,
        "phone": shippingInfo.phone,
        "billing_address": {
          "first_name": shippingInfo.name.split(' ')[0],
          "last_name": shippingInfo.name.split(' ').slice(1).join(' ') || " ",
          "email": shippingInfo.email,
          "phone": shippingInfo.phone,
          "address": shippingInfo.address,
          "city": shippingInfo.city,
          "postal_code": shippingInfo.postalCode,
          "country_code": "IDN"
        },
        "shipping_address": {
          "first_name": shippingInfo.name.split(' ')[0],
          "last_name": shippingInfo.name.split(' ').slice(1).join(' ') || " ",
          "email": shippingInfo.email,
          "phone": shippingInfo.phone,
          "address": shippingInfo.address,
          "city": shippingInfo.city,
          "postal_code": shippingInfo.postalCode,
          "country_code": "IDN"
        }
      },
      "enabled_payments": [selectedMethod]
    };

    // Create transaction
    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' }, 
      { status: 500 }
    );
  }
}