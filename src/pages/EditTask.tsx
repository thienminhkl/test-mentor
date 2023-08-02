//@mui
import { Stack, Typography } from '@mui/material';
//mui
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTaskForm from '~/components/CreateTaskForm';
//redux
import { handleGetTaskDetail } from '~/redux/slices/taskSlides';
import { useDispatch } from '~/redux/store';
//type
import { TaskForm } from '~/type/task.type';
//-------------------------------------------------------------------

function EditTask() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [task, setTask] = useState<TaskForm & { taskId: string }>();

  useEffect(() => {
    dispatch(handleGetTaskDetail(id, setTask));
  }, [dispatch, id]);

  return (
    <Stack m={2} spacing={2}>
      <Typography variant="h3">Edit Task</Typography>
      <CreateTaskForm isEdit currentTask={task} />
    </Stack>
  );
}

export default EditTask;
