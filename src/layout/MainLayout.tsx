// import Header from '@components/';
import { ReactNode } from 'react';
import Header from '@components/Header';
import Nav from '@common/Nav';
import { LoadingProvider } from '@hooks/useLoading';
import { useAuth } from '@hooks/useAuth';

interface MainLayoutParams {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutParams) {
  const { user } = useAuth();

  return (
    <>
      <LoadingProvider>
        <div className="min-h-full relative">
          {user?.id && <Header />}
          {user?.id && <Nav />}
          <main>
            <div className="max-w-7xl mx-auto py-6 px-1 sm:px-6 lg:px">{children}</div>
          </main>
        </div>
      </LoadingProvider>
    </>
  );
}
