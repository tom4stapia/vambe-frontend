'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sections/dashboard');
  }, [router]);

  return null;
}

export default DashboardRedirect;
