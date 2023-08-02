//react
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//@mui
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
//component
import SearchComponent from '~/components/SearchComponent';
import TaskBox from '~/components/TaskBox';
//redux
import { handleGetProjectDetail } from '~/redux/slices/projectSlides';
import { RootState, dispatch } from '~/redux/store';
//-------------------------------------------------------------------------------

export default function ProjectDetail() {
  const { id } = useParams();
  const { projectDetails } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(handleGetProjectDetail(id));
  }, [id]);

  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Project {projectDetails.projectName}</Typography>
      <Typography variant="h5">{projectDetails.alias}</Typography>
      <Stack direction={'row'} spacing={2}>
        <SearchComponent />
        <Stack direction={'row'} spacing={1}>
          {projectDetails.members.map((mem) => (
            <Avatar
              key={mem.userId}
              sx={{ width: 30, height: 30 }}
              src={mem.avatar}
            />
          ))}
        </Stack>
        <Button>Only my issue</Button>
        <Button>Recently Updated</Button>
      </Stack>
      <Grid container spacing={1}>
        {projectDetails.lstTask.map((task, index) => (
          <Grid key={index} item xs={2.8}>
            <TaskBox status={task.statusName} listTask={task.lstTaskDeTail} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
