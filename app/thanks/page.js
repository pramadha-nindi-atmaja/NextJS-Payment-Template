import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center'>
                <svg 
                    className="w-16 h-16 text-green-500 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Pembayaran Berhasil</h2>
                <p className='text-gray-600 mb-6'>Terimakasih telah melakukan pembayaran</p>
                <Link 
                    href="/" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}

export default page