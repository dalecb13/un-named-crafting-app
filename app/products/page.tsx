import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 w-full flex justify-between">
        <h1>Products Table</h1>

        <button
          onClick={() => router.push('/inventory/add')}
          className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
        >
          Add Inventory
        </button>
      </div>
    </div>
  )
}

export default ProductsPage;
