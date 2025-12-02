import React from "react";
import { useWishlist } from "../contexts/WishlistContext";

const WishlistButton = ({ product, lang = 'id' }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const t = {
    id: {
      addToWishlist: 'Tambah ke Wishlist',
      removeFromWishlist: 'Hapus dari Wishlist',
      added: 'Ditambahkan ke Wishlist',
      removed: 'Dihapus dari Wishlist'
    },
    en: {
      addToWishlist: 'Add to Wishlist',
      removeFromWishlist: 'Remove from Wishlist',
      added: 'Added to Wishlist',
      removed: 'Removed from Wishlist'
    }
  };

  const translations = t[lang] || t['id'];
  
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      // You could show a toast notification here if desired
    } else {
      addToWishlist(product);
      // You could show a toast notification here if desired
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isWishlisted
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      aria-label={isWishlisted ? translations.removeFromWishlist : translations.addToWishlist}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : "text-gray-400"}`}
        viewBox="0 0 20 20"
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      <span>{isWishlisted ? translations.removeFromWishlist : translations.addToWishlist}</span>
    </button>
  );
};

export default WishlistButton;