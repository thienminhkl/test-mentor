//react
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//component
import LoadingScreen from '~/components/LoadingScreen';
//redux
import { RootState } from '~/redux/store';

//----------------------------------------------------------------------------
function SignTemplate() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projectmanagement');
    } else navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

export default SignTemplate;
