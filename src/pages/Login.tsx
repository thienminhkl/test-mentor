import * as Yup from 'yup';
//@mui
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
//react
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
//hook-form
import { yupResolver } from '@hookform/resolvers/yup';
//hooks
import useResponsive from '~/hooks/useResponsive';
import FormProvider from '~/hooks/FormProvider';
import RHFTextField from '~/hooks/RHFTextField';
//redux
import { handleLogin } from '~/redux/slices/userSlides';
import { RootState, dispatch, useSelector } from '~/redux/store';
//type
import { LoginUser } from '~/type/user.type';

//---------------------------------------------------------------------
export type LogFormValuesProps = LoginUser & {
  afterSubmit?: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projectmanagement');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const defaultValues = {
    email: '',
    passWord: '',
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required!'),
    passWord: Yup.string().required('Password is required!'),
  });

  const methods = useForm<LogFormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LogFormValuesProps) => {
    const handleSetError = (error: any) => {
      setError('afterSubmit', {
        ...error,
        message: error.response.data.message || error,
      });
    };
    dispatch(handleLogin(data, navigate, handleSetError));
  };

  return (
    <Stack
      sx={{
        backgroundImage: 'linear-gradient(to bottom right, #447A7A, #F9E866)',
        textAlign: '-webkit-center',
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            backgroundColor: 'white',
            my: 6,
            borderRadius: 5,
            opacity: 0.85,
          }}
          width={isDesktop ? '50%' : '80%'}
          height={'90vh'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Stack spacing={3} sx={{ my: 10, mx: 3 }}>
            <RHFTextField name="email" label="Email" autoComplete="userName" />
            <RHFTextField
              name="passWord"
              label="Password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          {!!errors.afterSubmit && (
            <Alert severity="error" style={{ placeItems: 'center' }}>
              {errors.afterSubmit.message}
            </Alert>
          )}
          <Stack sx={{ my: 2 }}>
            <NavLink
              to="/register"
              style={{ fontSize: '1.2rem', marginLeft: 'auto' }}
            >
              You haven't have account? Register!
            </NavLink>
          </Stack>

          <Button
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            sx={{
              bgcolor: 'text.primary',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
              mt: 3,
              mb: 2,
              fontSize: '1.6rem',
            }}
          >
            Login
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}

export default LoginForm;
