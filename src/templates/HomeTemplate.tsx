//react
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//@mui
import {
  Add,
  ChevronLeft,
  ChevronRight,
  Search,
  CreditCard,
  Settings,
  LocalShipping,
  DensityLarge,
  Article,
  NearMe,
  AllInbox,
  Queue,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Stack,
  Typography,
} from '@mui/material';
import { CSSObject, styled } from '@mui/material/styles';
//type
import { SideBar } from '~/type/sidebar.type';
//component
import LoadingScreen from '~/components/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState, dispatch } from '~/redux/store';
import { logout } from '~/redux/slices/userSlides';
//-------------------------------------------------------------------------------
const drawerWidth = 200;

const openedMixin = (): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#071e51',
  color: 'white',
  overflowX: 'hidden',
});

const closedMixin = (): CSSObject => ({
  overflowX: 'hidden',
  backgroundColor: '#071e51',
  color: 'white',
  width: 50,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(),
    '& .MuiDrawer-paper': openedMixin(),
  }),
  ...(!open && {
    ...closedMixin(),
    '& .MuiDrawer-paper': closedMixin(),
  }),
}));

const listSidebar: SideBar[] = [
  { name: 'Create Task', icon: <Add />, href: '/' },
  { name: 'Search', icon: <Search />, href: '/' },
];
const listSubSidebarU: SideBar[] = [
  { name: 'Cyber Board', icon: <CreditCard />, href: '/' },
  {
    name: 'Project Management',
    icon: <Settings />,
    href: '/projectmanagement',
  },
  { name: 'Create Project', icon: <Queue />, href: '/createProject' },
];
const listSubSidebarL: SideBar[] = [
  { name: 'Releases', icon: <LocalShipping />, href: '/' },
  { name: 'Issue and filters', icon: <DensityLarge />, href: '/' },
  { name: 'Pages', icon: <Article />, href: '/' },
  { name: 'Report', icon: <NearMe />, href: '/' },
  { name: 'Components', icon: <AllInbox />, href: '/' },
];

//----------------------------------------------------------------------------
function HomeTemplate() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            minHeight: 48,
            justifyContent: open ? 'right' : 'center',
            px: 2.5,
          }}
        >
          <IconButton sx={{ color: 'white' }} onClick={() => setOpen(!open)}>
            {open ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listSidebar.map((i) => (
            <ListItem key={i.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href={i.href}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {i.icon}
                </ListItemIcon>
                <ListItemText primary={i.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': {
                height: '100%',
                backgroundColor: '#e7e7e7',
                color: 'black',
                ml: `${open ? '200px' : '50px'}`,
              },
            }}
          >
            <Stack alignItems={'center'} m={3} spacing={2} direction={'row'}>
              <Avatar src="/logoCyber.png" />
              <Stack spacing={1}>
                <Typography variant="h5">CyberLearn.vn</Typography>
                <Typography>Report bugs</Typography>
              </Stack>
            </Stack>
            <List>
              {listSubSidebarU.map((i) => (
                <ListItem key={i.name} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                    }}
                    href={i.href}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    >
                      {i.icon}
                    </ListItemIcon>
                    <ListItemText primary={i.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {listSubSidebarL.map((i) => (
                <ListItem key={i.name} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                    }}
                    href={i.href}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    >
                      {i.icon}
                    </ListItemIcon>
                    <ListItemText primary={i.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Stack mt={10} alignItems={'center'}>
              <Button
                sx={{ width: 50 }}
                variant="contained"
                href="/login"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </Stack>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeTemplate;
