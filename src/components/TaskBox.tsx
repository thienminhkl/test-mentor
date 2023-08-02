//@mui
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Card, IconButton, Stack, Typography } from '@mui/material';
//react
import { useNavigate } from 'react-router-dom';
//type
import { LstTaskDeTail } from '~/type/task.type';
//-------------------------------------------------------------------------------
type Props = {
  status: string;
  listTask: LstTaskDeTail[];
};

function TaskBox({ status, listTask }: Props) {
  const navigate = useNavigate();
  return (
    <Card sx={{ minHeight: 250, maxHeight: 500 }}>
      <Stack p={2} bgcolor={'grey'}>
        <Typography variant="h6">{status}</Typography>
      </Stack>
      <Stack spacing={0.5} my={1}>
        {listTask.map((task) => (
          <Stack key={task.taskId} p={2} spacing={2} bgcolor={'#bbbbbb'}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h5">{task.taskName}</Typography>
              <IconButton onClick={() => navigate(`/editTask/${task.taskId}`)}>
                <EditIcon />
              </IconButton>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
              {task.priorityTask.priorityId === 1 && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'red',
                  }}
                >
                  {task.priorityTask.priority}
                </Typography>
              )}
              {task.priorityTask.priorityId === 2 && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'yellow',
                  }}
                >
                  {task.priorityTask.priority}
                </Typography>
              )}
              {task.priorityTask.priorityId === 3 && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'green',
                  }}
                >
                  {task.priorityTask.priority}
                </Typography>
              )}
              {task.priorityTask.priorityId === 4 && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'grey',
                  }}
                >
                  {task.priorityTask.priority}
                </Typography>
              )}
              {task.assigness.map((mem) => (
                <Avatar
                  key={mem.id}
                  sx={{ width: 30, height: 30 }}
                  src={mem.avatar}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default TaskBox;
