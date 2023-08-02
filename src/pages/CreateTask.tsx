//@mui
import { Stack, Typography } from '@mui/material';
import CreateTaskForm from '~/components/CreateTaskForm';
//-------------------------------------------------------------------

function EditTask() {
  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Create Task</Typography>
      <CreateTaskForm />
    </Stack>
  );
}

export default EditTask;
