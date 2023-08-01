//react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//@mui
import { Stack, Typography } from '@mui/material';
//component
import CreateProjectForm from '~/components/CreateProjectForm';
//redux
import { handleGetProjectDetail } from '~/redux/slices/projectSlides';
import { useDispatch } from '~/redux/store';
//type
import { Projects } from '~/type/projects.type';
//-------------------------------------------------------------------------------

export default function EditProject() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [project, setProject] = useState<Projects>();

  useEffect(() => {
    dispatch(handleGetProjectDetail(id, setProject));
  }, [dispatch, id]);

  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Edit Project</Typography>
      <CreateProjectForm isEdit currentProject={project} />
    </Stack>
  );
}
