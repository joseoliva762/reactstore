/* eslint-disable @next/next/no-img-element */
import { Product } from '@models/product';
import { usePaginate } from '@hooks/usePaginate';
import { useLoading } from '@hooks/useLoading';
import { useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { deleteProduct, getAllProducts } from '@services/api/products';
import Link from 'next/link';

export default function ProductsList() {
  const { paginate, setProducts } = usePaginate();
  const loading = useLoading();

  useEffect(() => {
    loading.changeLoadingState(!paginate.products.length);
  }, [loading, paginate.products.length]);

  const handleDelete = (id: number) => {
    deleteProduct(id)
      .then(() => getAllProducts(0, 0).then(setProducts))
      .catch(console.error);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginate.productsSegment.map((product: Product) => (
                    <tr key={`dashboard-products-${product?.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product?.images?.[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product?.title}</div>
                            <div className="text-sm text-gray-500">{product?.category?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product?.category?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{`$${product.price}.00`}</span>
                      </td>
                      <td className="flex gap-3 px-6 py-4 whitespace-nowrap">
                        <Link href={`/dashboard/products/edit/${product.id}`} passHref>
                          <div className="cursor-pointer text-indigo-600 hover:text-indigo-900">Edit</div>
                        </Link>
                        <div className="flex items-center justify-start h-full">
                          <XCircleIcon className="flex flex-shrink-0 h-6 text-gray-400 hover:text-gray-500 w-6 hover:cursor-pointer" aria-hidden onClick={() => product?.id && handleDelete(product?.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
