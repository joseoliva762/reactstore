import { PaginateContextModel } from '@models/paginate';
import { Product } from '@models/product';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

let paginateInitialState = {
  actualPage: 1,
  actualShow: 1,
  range: 10,
  products: [] as Product[],
  productsSegment: [] as Product[],
  maximumPages: 1,
  pagesToShow: 5
};

export const PaginateContext = createContext({} as PaginateContextModel);

interface PaginatePrividerParams {
  children: ReactNode;
}

export const PaginatePrivider = ({ children }: PaginatePrividerParams) => {
  const paginate = usePaginateProvider();

  return (
    <>
      <PaginateContext.Provider value={paginate}>{children}</PaginateContext.Provider>
    </>
  );
};

export const usePaginate = () => useContext(PaginateContext);

const usePaginateProvider = () => {
  const [paginate, setPaginate] = useState(paginateInitialState);
  useEffect(() => {
    setProductsSegment(paginate.actualPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginate.products]);

  const setProducts = (products: Product[]) => {
    const maximumPages = Math.ceil(products.length / paginate.range);
    if (!products.length && !maximumPages) return;
    setPaginate({
      ...paginate,
      products,
      maximumPages
    });
  };

  const incresePage = () => {
    const actualShow = paginate.actualShow + 1;
    if (actualShow + paginate.pagesToShow - 1 > paginate.maximumPages) return;
    setPaginate({ ...paginate, actualShow });
  };

  const decresePage = () => {
    const actualShow = paginate.actualShow - 1;
    if (actualShow <= 0) return;
    setPaginate({ ...paginate, actualShow });
  };

  const selectPage = (page: number) => {
    const { maximumPages, actualPage } = paginate;
    const isValid = page > 0 && page <= maximumPages && page !== actualPage;
    if (!isValid) return;
    setProductsSegment(page);
  };

  const setProductsSegment = (page: number) => {
    const productsLength = paginate.products.length;
    const productsSegment = [...paginate.products].filter((product: Product, index: number) => {
      const start = (page - 1) * paginate.range;
      const range = start + paginate.range;
      const end = range <= productsLength ? range : productsLength;
      return index >= start && index < end;
    });

    setPaginate({ ...paginate, productsSegment, actualPage: page });
  };

  return {
    paginate,
    setProducts,
    incresePage,
    decresePage,
    selectPage,
    setProductsSegment
  };
};
