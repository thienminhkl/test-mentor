import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '~/redux/store';
import { useEffect } from 'react';
import CreateProjectForm from '~/components/CreateProjectForm';

export default function EditProject() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const currentProject = useSelector((state) =>
    state.project.listProjects.find((project) => project.id === id)
  );

  useEffect(() => {}, [dispatch]);

  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Edit Project</Typography>
      <CreateProjectForm isEdit currentProject={currentProject} />
    </Stack>
  );
}
