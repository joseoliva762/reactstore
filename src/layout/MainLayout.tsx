// import Header from '@components/';
import { ReactNode } from 'react';
import Header from '@components/Header';
import Nav from '@common/Nav';
import { LoadingProvider } from '@hooks/useLoading';

interface MainLayoutParams {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutParams) {
  return (
    <>
      <LoadingProvider>
        <div className="min-h-full relative">
          <Header />
          <Nav />
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px">{children}</div>
          </main>
        </div>
      </LoadingProvider>
    </>
  );
}
