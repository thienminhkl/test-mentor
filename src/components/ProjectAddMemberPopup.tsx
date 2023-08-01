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
//react
import { MouseEvent, useState } from 'react';
//hooks
import { handleAddUserProj } from '~/redux/slices/projectSlides';
import { dispatch } from '~/redux/store';
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
            onClick={() => dispatch(handleAddUserProj(projId, user))}
          >
            Add
          </Button>
        </Stack>
      </Popover>
    </Stack>
  );
}
