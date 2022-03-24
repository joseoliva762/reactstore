/* eslint-disable @next/next/no-title-in-document-head */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductsForm from '@components/ProductsForm';
import { Product } from '@models/product';
import { getProductyById } from '@services/api/products';

export default function Edit() {
  const [product, setProduct] = useState<Product>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id && router.isReady) {
      const { id } = router.query;
      const getProduct = async () => {
        try {
          const product = await getProductyById(parseInt(id as string));
          setProduct(product);
        } catch (error) {
          console.error(error);
          router.push('/dashboard/products');
        }
      };
      getProduct();
    }
  }, [router, router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Yardstore - edit {product?.title}</title>
      </Head>
      <ProductsForm product={product} />
    </>
  );
}
