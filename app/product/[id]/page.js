"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Checkout from "../../components/Checkout";
import OrderSummary from "../../components/OrderSummary";
import PaymentMethods from "../../components/PaymentMethods";
import ShippingInfo from "../../components/ShippingInfo";
import ProductGallery from "../../components/ProductGallery";
import SizeSelector from "../../components/SizeSelector";
import ProductReviews from "../../components/ProductReviews";
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext";
import { useRating } from "../../contexts/RatingContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-hot-toast";

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
    price: 350000,
    description: "Jaket denim klasik dari LEVI'S® yang didesain khusus untuk wanita dengan ukuran XL. Terbuat dari bahan berkualitas tinggi, memberikan kenyamanan dan gaya yang tak tertandingi.",
    image: "/img.png",
    images: ["/img.png", "/img.png", "/img.png", "/img.png"],
    colors: [
      { value: "putih", label: "Putih" },
      { value: "biru", label: "Biru" },
      { value: "coklat", label: "Coklat" },
      { value: "kuning", label: "Kuning" },
      { value: "merah", label: "Merah" },
      { value: "hijau", label: "Hijau" },
      { value: "hitam", label: "Hitam" },
      { value: "abu-abu", label: "Abu-Abu" }
    ],
    sizes: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" }
    ],
    features: [
      "Bahan denim premium yang tahan lama",
      "Desain klasik dengan siluet yang ramping",
      "Kantong saku depan fungsional",
      "Kancing logam berkualitas tinggi",
      "Tersedia dalam berbagai pilihan warna"
    ],
    rating: 4.5,
    reviewCount: 128,
    reviews: [
      {
        id: 1,
        userName: "Sarah Johnson",
        rating: 5,
        date: "2023-10-15",
        comment: "Kualitas jaket sangat bagus, bahan tebal dan nyaman dipakai. Ukuran sesuai dengan deskripsi."
      },
      {
        id: 2,
        userName: "Michael Chen",
        rating: 4,
        date: "2023-09-22",
        comment: "Desainnya keren dan pas di badan. Hanya saja pengirimannya agak lama."
      },
      {
        id: 3,
        userName: "Dewi Putri",
        rating: 5,
        date: "2023-11-05",
        comment: "Sangat puas dengan pembelian ini. Jaketnya stylish dan tahan lama. Recommended!"
      }
    ]
  },
  {
    id: 2,
    name: "ZARA Basic Cotton T-Shirt",
    price: 150000,
    description: "Kaos katun dasar dari ZARA dengan desain simpel namun elegan. Cocok untuk digunakan sehari-hari baik untuk pria maupun wanita.",
    image: "/img.png",
    images: ["/img.png", "/img.png", "/img.png"],
    colors: [
      { value: "putih", label: "Putih" },
      { value: "hitam", label: "Hitam" },
      { value: "abu-abu", label: "Abu-Abu" }
    ],
    sizes: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" }
    ],
    features: [
      "Bahan katun 100% yang nyaman dipakai",
      "Desain simpel dan timeless",
      "Tersedia dalam berbagai ukuran",
      "Cocok untuk pakaian sehari-hari"
    ],
    rating: 4.2,
    reviewCount: 89,
    reviews: [
      {
        id: 1,
        userName: "Rina Sari",
        rating: 4,
        date: "2023-08-12",
        comment: "Kaosnya nyaman dan tidak mudah luntur setelah dicuci beberapa kali."
      },
      {
        id: 2,
        userName: "Andi Prasetyo",
        rating: 5,
        date: "2023-09-05",
        comment: "Kualitas bagus dengan harga terjangkau. Ukuran pas."
      }
    ]
  },
  {
    id: 3,
    name: "UNIQLO Ultra Stretch Jeans",
    price: 450000,
    description: "Celana jeans stretchable dari UNIQLO yang memberikan kenyamanan ekstra saat digunakan. Desain modern dengan bahan berkualitas tinggi.",
    image: "/img.png",
    images: ["/img.png", "/img.png", "/img.png"],
    colors: [
      { value: "biru", label: "Biru" },
      { value: "hitam", label: "Hitam" }
    ],
    sizes: [
      { value: "28", label: "28" },
      { value: "30", label: "30" },
      { value: "32", label: "32" },
      { value: "34", label: "34" },
      { value: "36", label: "36" }
    ],
    features: [
      "Bahan stretchable yang nyaman digerakkan",
      "Desain modern dan stylish",
      "Tahan lama dan tidak mudah robek",
      "Tersedia dalam berbagai ukuran pinggang"
    ],
    rating: 4.7,
    reviewCount: 203,
    reviews: [
      {
        id: 1,
        userName: "Budi Santoso",
        rating: 5,
        date: "2023-10-20",
        comment: "Celana jeans terbaik yang pernah saya beli. Sangat nyaman dipakai seharian."
      },
      {
        id: 2,
        userName: "Lisa Wijaya",
        rating: 4,
        date: "2023-11-01",
        comment: "Kualitas bagus, hanya ukuran 32 agak ketat untuk saya."
      }
    ]
  },
  {
    id: 4,
    name: "H&M Slim Fit Chino Pants",
    price: 250000,
    description: "Celana chino slim fit dari H&M dengan desain elegan dan bahan yang nyaman. Cocok untuk kegiatan formal maupun kasual.",
    image: "/img.png",
    images: ["/img.png", "/img.png"],
    colors: [
      { value: "khaki", label: "Khaki" },
      { value: "hitam", label: "Hitam" },
      { value: "navy", label: "Navy" }
    ],
    sizes: [
      { value: "28", label: "28" },
      { value: "30", label: "30" },
      { value: "32", label: "32" },
      { value: "34", label: "34" }
    ],
    features: [
      "Bahan chino yang ringan dan nyaman",
      "Desain slim fit yang modern",
      "Cocok untuk acara formal maupun kasual",
      "Tersedia dalam berbagai warna elegan"
    ],
    rating: 4.0,
    reviewCount: 67,
    reviews: [
      {
        id: 1,
        userName: "Eko Prabowo",
        rating: 4,
        date: "2023-07-15",
        comment: "Celana bagus dan cocok untuk kantor. Hanya pengirimannya agak lama."
      }
    ]
  },
  {
    id: 5,
    name: "ADIDAS Running Shoes",
    price: 750000,
    description: "Sepatu lari dari ADIDAS dengan teknologi terbaru untuk memberikan kenyamanan maksimal saat berolahraga. Sol yang ringan dan bantalan empuk.",
    image: "/img.png",
    images: ["/img.png", "/img.png", "/img.png"],
    colors: [
      { value: "putih", label: "Putih" },
      { value: "hitam", label: "Hitam" },
      { value: "biru", label: "Biru" }
    ],
    sizes: [
      { value: "39", label: "39" },
      { value: "40", label: "40" },
      { value: "41", label: "41" },
      { value: "42", label: "42" },
      { value: "43", label: "43" },
      { value: "44", label: "44" }
    ],
    features: [
      "Sol ringan dengan bantalan empuk",
      "Bahan yang cepat kering",
      "Desain ergonomis untuk kaki",
      "Tersedia dalam berbagai ukuran"
    ],
    rating: 4.8,
    reviewCount: 156,
    reviews: [
      {
        id: 1,
        userName: "Joko Susilo",
        rating: 5,
        date: "2023-11-10",
        comment: "Sepatunya sangat nyaman saat digunakan untuk jogging pagi. Kualitas oke!"
      },
      {
        id: 2,
        userName: "Maya Dewi",
        rating: 5,
        date: "2023-11-15",
        comment: "Desainnya bagus dan nyaman dipakai seharian. Worth the price!"
      }
    ]
  },
  {
    id: 6,
    name: "NIKE Sports Jacket",
    price: 650000,
    description: "Jaket olahraga dari NIKE dengan teknologi Dri-FIT yang membuat Anda tetap kering dan nyaman selama berolahraga.",
    image: "/img.png",
    images: ["/img.png", "/img.png", "/img.png"],
    colors: [
      { value: "hitam", label: "Hitam" },
      { value: "biru", label: "Biru" },
      { value: "merah", label: "Merah" }
    ],
    sizes: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" }
    ],
    features: [
      "Teknologi Dri-FIT untuk menjaga kesejukan",
      "Desain aerodinamis untuk mobilitas maksimal",
      "Tersedia dalam berbagai warna menarik",
      "Bahan yang ringan namun tahan lama"
    ],
    rating: 4.6,
    reviewCount: 94,
    reviews: [
      {
        id: 1,
        userName: "Dian Permata",
        rating: 5,
        date: "2023-10-28",
        comment: "Jaketnya sangat nyaman saat digunakan untuk gym. Bahan tidak mudah gerah."
      }
    ]
  }
];

export default function ProductDetailPage({ params }) {
  const productId = parseInt(params.id);
  const product = dummyProducts.find(p => p.id === productId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.value || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.value || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('credit_card');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [productData, setProductData] = useState(product);
  
  const { addRecentlyViewed } = useRecentlyViewed();
  const { addProductReview } = useRating();
  const { wishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      // Add product to recently viewed
      addRecentlyViewed(product);
      
      // Set initial states
      setSelectedColor(product.colors[0]?.value || "");
      setSelectedSize(product.sizes[0]?.value || "");
      
      // Simulate loading completion
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [product, addRecentlyViewed]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handleAddReview = async (newReview) => {
    // In a real app, this would be an API call
    // For now, we'll update the local state
    setProductData(prev => {
      const updatedReviews = [newReview, ...prev.reviews];
      const newReviewCount = prev.reviewCount + 1;
      // Recalculate average rating
      const totalRating = prev.reviews.reduce((sum, review) => sum + review.rating, 0) + newReview.rating;
      const newAverageRating = totalRating / newReviewCount;
      
      return {
        ...prev,
        reviews: updatedReviews,
        reviewCount: newReviewCount,
        rating: newAverageRating
      };
    });
    
    // Also save to context for persistence
    addProductReview(product.id, newReview);
    
    toast.success("Ulasan berhasil ditambahkan");
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Silakan masuk untuk menambahkan ke daftar keinginan");
      return;
    }
    
    const wasInWishlist = wishlist.some(item => item.id === product.id);
    toggleWishlist(product);
    
    if (wasInWishlist) {
      toast.success(`${product.name} dihapus dari daftar keinginan`);
    } else {
      toast.success(`${product.name} ditambahkan ke daftar keinginan`);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    
    addToCart(productToAdd);
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Gallery Component */}
        <div className="p-4 sm:p-6">
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            isLoading={isLoading} 
          />
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-blue-600">
              Rp {formatPrice(product.price)}
            </p>
          </div>
          
          {/* Wishlist Button */}
          <div className="mb-4">
            <button
              onClick={handleToggleWishlist}
              className="flex items-center text-gray-600 hover:text-red-500"
            >
              {wishlist.some(item => item.id === product.id) ? (
                <>
                  <svg className="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>Dalam Daftar Keinginan</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Tambah ke Daftar Keinginan</span>
                </>
              )}
            </button>
          </div>
          
          {/* Size Selection */}
          <SizeSelector 
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          
          {/* Color Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Warna</h2>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.value}
                  className={`px-3 py-1 text-sm rounded-full border transition-all ${
                    selectedColor === color.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedColor(color.value)}
                  aria-pressed={selectedColor === color.value}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {product.features && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Fitur</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Shipping Information */}
          <ShippingInfo 
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
          />
          
          {/* Payment Methods */}
          <PaymentMethods 
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
          
          {/* Order Summary */}
          <div className="mb-6">
            <OrderSummary 
              quantity={quantity} 
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              couponDiscount={couponDiscount}
              setCouponDiscount={setCouponDiscount}
            />
          </div>
          
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah ke Keranjang
              </button>
              <Checkout 
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedMethod={selectedMethod}
                shippingInfo={shippingInfo}
                couponDiscount={couponDiscount}
              />
            </div>
          </div>
          
          {/* Product Reviews */}
          <ProductReviews 
            product={productData}
            onAddReview={handleAddReview}
          />
        </div>
      </div>
    </main>
  );
}