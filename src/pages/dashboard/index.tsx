import Head from 'next/head';
import Paginate from '@components/Paginate';
import ProductsList from '@components/ProductsList';
import { PaginatePrivider } from '@hooks/usePaginate';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>YardStore - Dashboard</title>
      </Head>
      <PaginatePrivider>
        <Paginate />
        <ProductsList />
        <Paginate />
      </PaginatePrivider>
    </>
  );
}
