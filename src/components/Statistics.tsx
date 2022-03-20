import Chart from '@common/Chart';
import { usePaginate } from '@hooks/usePaginate';
import { Category, Product } from '@models/product';
import { useEffect, useState } from 'react';

export default function Statistics() {
  const { paginate } = usePaginate();
  const [products, setProducts] = useState([] as Product[]);
  const [selection, setSelection] = useState<'all' | 'page'>('all');
  const categories = products?.map((product: Product) => product.category);
  const categoriesCount = categories?.map((category: Category) => category.name);
  const categoriesOccurrences = categoriesCount.reduce((occurrences: any, category: string) => {
    const categoryOccurrence = occurrences[category];
    occurrences[category] = categoryOccurrence ? categoryOccurrence + 1 : 1;
    return { ...occurrences };
  }, {});

  useEffect(() => {
    setProducts(paginate.products);
  }, [paginate.products]);

  useEffect(() => {
    setProducts(selection === 'all' ? paginate.products : paginate.productsSegment);
  }, [paginate.products, paginate.productsSegment, selection]);

  const data = {
    datasets: [
      {
        label: 'Category',
        data: categoriesOccurrences,
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f3ba2f', '#2a71d0']
      }
    ]
  };

  return (
    <>
      <Chart chartdata={data} className="mb-8 mt-2" />
      <div className="flex gap-2 h-14 items-center justify-center p-2 w-full">
        <button onClick={() => setSelection('all')} className="bg-white border border-gray-300 font-medium h-full p-1 rounded text-gray-500 text-sm w-28 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-600 active:brightness-95">
          All products
        </button>
        <button onClick={() => setSelection('page')} className="bg-white border border-gray-300 font-medium h-full p-1 rounded text-gray-500 text-sm w-28 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-600 active:brightness-95">
          This page
        </button>
      </div>
    </>
  );
}
