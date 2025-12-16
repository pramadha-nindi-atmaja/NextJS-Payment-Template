export const product = {
  id: ~~(Math.random() * 100) + 1,
  // Adding multiple images for gallery feature
  images: [
    "/img.png",
    "/img.png", // Placeholder - in a real app, these would be different images
    "/img.png",
    "/img.png"
  ],
  image: "/img.png", // Keeping original property for backward compatibility
  name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
  price: 350000,
  description:
    "Jaket denim klasik dari LEVI'S® yang didesain khusus untuk wanita dengan ukuran XL. Terbuat dari bahan berkualitas tinggi, memberikan kenyamanan dan gaya yang tak tertandingi.",
  colors: [
    { value: "putih", label: "Putih" },
    { value: "biru", label: "Biru" },
    { value: "coklat", label: "Coklat" },
    { value: "kuning", label: "Kuning" },
    { value: "merah", label: "Merah" },
    { value: "hijau", label: "Hijau" },
    { value: "hitam", label: "Hitam" },
    { value: "abu-abu", label: "Abu-Abu" },
  ],
  // Adding sizes for the product
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
  // Adding rating and review data
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
};