// import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useFetch } from '@hooks/useFetch';
import { usePaginate } from '@hooks/usePaginate';
import { Product } from '@models/product';
import endPoints from '@services/api';
import { useEffect } from 'react';

const Paginate = () => {
  const { paginate, selectPage, setProducts, incresePage, decresePage } = usePaginate();
  const products: Product[] = useFetch(endPoints.products.getProducts(0, 0));
  const base = new Array(paginate.pagesToShow).fill(1);
  const start = (paginate.actualPage - 1) * paginate.range;
  const range = start + paginate.range;
  const productsLength = paginate.products.length;
  const end = range <= productsLength ? range : productsLength;

  useEffect(() => {
    setProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex gap-1 items-center justify-between sm:hidden">
          <button onClick={() => selectPage(paginate.actualPage - 1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <div className="flex gap-1 items-center h-full justify-center w-full">
            <p className="text-sm text-gray-900">Page</p>
            <p className="font-bold text-sm text-gray-900">{paginate.actualPage}</p>
          </div>
          <button onClick={() => selectPage(paginate.actualPage + 1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{end}</span> of <span className="font-medium">{paginate.products.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button onClick={decresePage} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {base.map((filled, index) => {
                const { actualShow, maximumPages, pagesToShow } = paginate;
                const valueToFill = actualShow + index;
                let page = valueToFill > maximumPages && maximumPages > pagesToShow ? valueToFill - maximumPages : valueToFill;
                page = page <= 0 ? page + maximumPages : page;
                if (page > maximumPages || page <= 0) return;

                return (
                  <button
                    key={`page-indicator-${index}`}
                    onClick={() => selectPage(page)}
                    aria-current="page"
                    className={
                      page === paginate.actualPage
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    }
                  >
                    {page}
                  </button>
                );
              })}
              <button onClick={incresePage} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paginate;
