import * as Yup from 'yup';
//axios
//react
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
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
//hook-form
import { yupResolver } from '@hookform/resolvers/yup';
//hooks
import FormProvider from '~/hooks/FormProvider';
import RHFTextField from '~/hooks/RHFTextField';
import useResponsive from '~/hooks/useResponsive';
//redux
import { handleRegister } from '~/redux/slices/userSlides';
import { dispatch } from '~/redux/store';
//type
import { RegisUser } from '~/type/user.type';
//---------------------------------------------------------------------
type RegisFormValuesProps = RegisUser & {
  afterSubmit?: string;
};

function Register() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    email: '',
    passWord: '',
    phoneNumber: '',
    name: '',
  };

  const RegisSchema = Yup.object({
    email: Yup.string()
      .email('Email is not right')
      .required('Email is required!'),
    name: Yup.string().required('Name is required!'),
    passWord: Yup.string()
      .min(8, 'Password must be more than 8 characters')
      .required('Password is required!'),
    phoneNumber: Yup.string().required('Phone number is required!'),
  });

  const methods = useForm<RegisFormValuesProps>({
    resolver: yupResolver(RegisSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegisFormValuesProps) => {
    const handleSetError = (error: any) => {
      setError('afterSubmit', {
        ...error,
        message: error.response.data.message || error,
      });
    };
    dispatch(handleRegister(data, navigate, handleSetError));
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
            my: 5,
            borderRadius: 5,
            opacity: 0.85,
          }}
          width={isDesktop ? '60%' : '80%'}
          alignItems={'center'}
          height={'90vh'}
          justifyContent={'center'}
        >
          <Stack spacing={2} sx={{ my: 5, mx: 3 }}>
            <RHFTextField name="name" label="Name" autoComplete="account" />
            <RHFTextField
              name="email"
              label="Email"
              autoComplete="email"
              sx={{ my: 2 }}
            />
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

            <RHFTextField
              name="phoneNumber"
              label="Phone number"
              type="number"
              sx={{ my: 2 }}
            />
          </Stack>
          {!!errors.afterSubmit && (
            <Alert severity="error" style={{ placeItems: 'center' }}>
              {errors.afterSubmit.message}
            </Alert>
          )}
          <Stack>
            <NavLink
              to="/login"
              style={{ fontSize: '1.2rem', marginLeft: 'auto' }}
            >
              You already have an account? Login!
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
              my: 2,
              fontSize: '1.6rem',
            }}
          >
            Register
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}

export default Register;
