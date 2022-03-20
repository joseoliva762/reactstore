import Head from 'next/head';
import Paginate from '@components/Paginate';
import ProductsList from '@components/ProductsList';
import { PaginatePrivider } from '@hooks/usePaginate';
import Statistics from '@components/Statistics';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>YardStore - Dashboard</title>
      </Head>
      <PaginatePrivider>
        <Statistics />
        <Paginate />
        <ProductsList />
        <Paginate />
      </PaginatePrivider>
    </>
  );
}
