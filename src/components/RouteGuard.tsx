import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJWT } from '@/lib/jwt';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard = async ({ children }: RouteGuardProps) => {
  // Get cookies on the server side
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  // Check token and redirect if invalid
  if (!token || !verifyJWT(token)) {
    redirect('/');
  }

  return <>{children}</>;
};

export default RouteGuard;