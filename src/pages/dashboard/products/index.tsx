import Head from 'next/head';
import Paginate from '@components/Paginate';
import ProductsHeaders from '@components/ProductsHeader';
import ProductsList from '@components/ProductsList';
import { PaginateProvider } from '@hooks/usePaginate';

export default function Products() {
  return (
    <>
      <Head>
        <title>YardStore - Products</title>
      </Head>
      <PaginateProvider>
        <ProductsHeaders />
        <Paginate />
        <ProductsList />
      </PaginateProvider>
    </>
  );
}
