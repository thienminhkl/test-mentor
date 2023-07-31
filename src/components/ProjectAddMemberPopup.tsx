//@mui
import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
//axios
import axios from 'axios';
//react
import { MouseEvent, useState } from 'react';
//hooks
import { CYBERTOKEN } from '~/hooks/const';
//type
import { User } from '~/type/user.type';

//-------------------------------------------------------------------------------
type Props = {
  listUser: User[];
  projId: string | number;
};

export default function ProjectAddMemberPopup({ listUser, projId }: Props) {
  const [user, setUser] = useState<User | null>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleAddUser = async () => {
    if (user) {
      try {
        const resp = await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/assignUserProject`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhbmhjdW9uZ0BnbWFpbC5jb20iLCJuYmYiOjE2OTA3NzQ3MjcsImV4cCI6MTY5MDc3ODMyN30.RP_NLAKl6AijR3MUSS9DORn2QkZkkEc8xaSgWD3HTBc`,
          },
          data: {
            projectId: projId,
            userId: user.userId,
          },
        });
        console.log(resp);
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  return (
    <Stack direction="row" spacing={0.2}>
      <IconButton size="small" aria-describedby={id} onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          sx={{ p: 2, height: 300 }}
          spacing={2}
          justifyContent={'space-between'}
        >
          <Stack spacing={2}>
            <Typography variant="h5">Add user</Typography>
            <Autocomplete
              disablePortal
              options={listUser}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => {
                setUser(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="List User" />
              )}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.userId}>
                    {option.name}
                  </li>
                );
              }}
              sx={{ width: 300 }}
            />
          </Stack>

          <Button
            sx={{ width: 50 }}
            variant="contained"
            onClick={handleAddUser}
          >
            Add
          </Button>
        </Stack>
      </Popover>
    </Stack>
  );
}
