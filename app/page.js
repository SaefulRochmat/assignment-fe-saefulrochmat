import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <>
        <h1 className="text-5xl font-extrabold text-center p-4 mt-8 mb-8">FAKE <span className="text-6xl border-b-4 border-red-600">STORE</span></h1>
        <ProductList></ProductList>
    </>
  );
}
