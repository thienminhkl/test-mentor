import { CircularProgress, Stack } from '@mui/material'

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  return (
    <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
      <CircularProgress />
    </Stack>
  )
}
