import { Stack, Typography } from '@mui/material';
import CreateProjectForm from '~/components/CreateProjectForm';

function CreateProject() {
  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Create Project</Typography>
      <CreateProjectForm />
    </Stack>
  );
}

export default CreateProject;
