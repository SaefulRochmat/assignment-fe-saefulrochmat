import Image from "next/image";

export default function ProductCard({ product }) {
    return (
        <>
            <div className="w-full max-w-xs rounded-md shadow-md mb-4 cursor-pointer transition duration-300 ease-in hover:translate-y-1 hover:scale-110">
                <div className="relative w-full h-48 sm:h-52">
                    <Image
                    src={product.image}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    alt={product.title}
                    className="object-cover rounded-t-xl p-4"
                    />
                </div>
                <div className="px-4 py-3">
                    <span className="text-slate-700 font-medium mr-3 uppercase text-xs">
                    {product.category}
                    </span>
                    <p className="text-lg font-bold truncate block capitalize">
                    {product.title}
                    </p>
                    <div className="flex items-center">
                    <p className="text-xl font-semibold text-slate-800 cursor-auto my-3">
                        $ {product.price}
                    </p>
                    <del>
                        <p className="text-sm text-slate-600 cursor-auto ml-2">
                        $ {product.price}
                        </p>
                    </del>
                    <div className="ml-auto">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bag-plus"
                        viewBox="0 0 16 16"
                        >
                        <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}