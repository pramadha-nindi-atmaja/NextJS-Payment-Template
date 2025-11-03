import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { thanksTranslations } from '../libs/thanksTranslations'
import { formatPrice } from '../utils/formatPrice'

const ThanksPage = ({ lang = 'id' }) => {
    const t = thanksTranslations[lang]
    const [orderDetails, setOrderDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // In a real app, you'd get the order ID from URL params or context
                const response = await fetch('/api/order/123')
                const data = await response.json()
                setOrderDetails(data)
            } catch (error) {
                console.error('Failed to fetch order details:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrderDetails()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full'>
                <div className='text-center mb-8'>
                    <div className='relative'>
                        <svg 
                            className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800 mb-2' role="status">{t.title}</h1>
                    <p className='text-gray-600'>{t.subtitle}</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" role="status">
                            <span className="sr-only">{t.loading}</span>
                        </div>
                    </div>
                ) : orderDetails && (
                    <div className="border rounded-lg p-4 mb-6 space-y-3">
                        <h2 className="font-semibold text-gray-800 mb-4">{t.orderDetails}</h2>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-gray-600">{t.transactionId}</p>
                            <p className="text-gray-900 font-medium">{orderDetails.transactionId}</p>
                            
                            <p className="text-gray-600">{t.orderDate}</p>
                            <p className="text-gray-900 font-medium">
                                {new Date(orderDetails.date).toLocaleDateString()}
                            </p>
                            
                            <p className="text-gray-600">{t.product}</p>
                            <p className="text-gray-900 font-medium">{orderDetails.productName}</p>
                            
                            <p className="text-gray-600">{t.quantity}</p>
                            <p className="text-gray-900 font-medium">{orderDetails.quantity}</p>
                            
                            <p className="text-gray-600">{t.amount}</p>
                            <p className="text-gray-900 font-medium">{formatPrice(orderDetails.amount)}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                        href="/" 
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 text-center"
                        role="button"
                    >
                        {t.backHome}
                    </Link>
                    
                    <button
                        onClick={() => window.print()}
                        className="inline-block border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-md transition duration-300"
                        aria-label={t.downloadReceipt}
                    >
                        {t.downloadReceipt}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page