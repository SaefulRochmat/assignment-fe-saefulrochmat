import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <>
        <h1 className="text-5xl font-extrabold text-center p-4 mt-8 mb-8 bg-gradient-to-r from-amber-300 via-green-200 to-pink-400 bg-clip-text text-transparent select-auto">PRODUK FAKE STORE</h1>
        <ProductList></ProductList>
    </>
  );
}
