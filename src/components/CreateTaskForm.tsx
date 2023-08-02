import * as Yup from 'yup';
//@hookform
import { yupResolver } from '@hookform/resolvers/yup';
//@mui
import { Button, Card, Grid, Slider, Stack, Typography } from '@mui/material';
//react
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
//hooks
import FormProvider from '~/hooks/FormProvider';
import RHFEditor from '~/hooks/RHFEditor';
import { RHFMultiSelect, RHFSelect } from '~/hooks/RHFSelect';
import RHFTextField from '~/hooks/RHFTextField';
//redux
import { dispatch, useSelector } from '~/redux/store';
//type
import { useNavigate } from 'react-router-dom';
import {
  handleCreateTask,
  handleGetPriority,
  handleGetStatus,
  handleGetTaskType,
  handleUpdateTask,
} from '~/redux/slices/taskSlides';
import { Priority, Status, TaskForm, TaskType } from '~/type/task.type';
//-------------------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentTask?: TaskForm & { taskId: string };
};

export default function CreateTaskForm({ isEdit, currentTask }: Props) {
  const nav = useNavigate();
  const { listProjects } = useSelector((state) => state.project);
  const { userProfile, listUser } = useSelector((state) => state.user);
  const [status, setStatus] = useState<Status[]>([]);
  const [priority, setPriority] = useState<Priority[]>([]);
  const [taskType, setTaskType] = useState<TaskType[]>([]);

  const NewTaskSchema = Yup.object().shape({
    projectId: Yup.number().required('Project is required!'),
    taskName: Yup.string().required('Task name is required!'),
    statusId: Yup.string().required('Status is required!'),
    priorityId: Yup.number().required('Priority is required!'),
    typeId: Yup.number().required('Type is required!'),
    listUserAsign: Yup.array().required('Assignees user!'),
    timeTrackingSpent: Yup.number().required('Status is required!'),
    timeTrackingRemaining: Yup.number().required('Status is required!'),
    originalEstimate: Yup.number().required('Status is required!'),
    description: Yup.string().required('Status is required!'),
  });
  const defaultValues = useMemo(
    () => ({
      projectId: currentTask?.projectId || 0,
      taskName: currentTask?.taskName || '',
      statusId: currentTask?.statusId || '',
      priorityId: currentTask?.priorityId || 0,
      typeId: currentTask?.typeId || 0,
      listUserAsign: currentTask?.listUserAsign || [],
      timeTrackingSpent: currentTask?.timeTrackingSpent || 0,
      timeTrackingRemaining: currentTask?.timeTrackingRemaining || 0,
      originalEstimate: currentTask?.originalEstimate || 0,
      description: currentTask?.description || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTask]
  );

  const methods = useForm<TaskForm>({
    resolver: yupResolver(NewTaskSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentTask) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTask]);

  useEffect(() => {
    dispatch(handleGetStatus(setStatus));
    dispatch(handleGetPriority(setPriority));
    dispatch(handleGetTaskType(setTaskType));
  }, [listProjects, userProfile?.id]);

  const onSubmit = async (data: TaskForm) => {
    if (isEdit) {
      dispatch(handleUpdateTask({ ...data, taskId: currentTask?.taskId }, nav));
    } else {
      dispatch(handleCreateTask(data, nav));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Project
            </Typography>
            <RHFSelect native name="projectId">
              {listProjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.projectName}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <RHFTextField name="taskName" label="Task name" />

          <Stack spacing={1}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Status
            </Typography>
            <RHFSelect native name="statusId">
              {status.map((option) => (
                <option key={option.statusId} value={option.statusId}>
                  {option.statusName}
                </option>
              ))}
            </RHFSelect>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={5.8}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Priority
                  </Typography>
                  <RHFSelect native name="priorityId">
                    {priority.map((option) => (
                      <option key={option.priorityId} value={option.priorityId}>
                        {option.priority}
                      </option>
                    ))}
                  </RHFSelect>
                </Stack>

                <RHFMultiSelect
                  chip
                  checkbox
                  name="listUserAsign"
                  label="Assign user"
                  options={listUser}
                  optionvalue={'userId'}
                  optionlabel={'name'}
                />
              </Stack>
            </Grid>
            <Grid item xs={5.8}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Task type
                  </Typography>
                  <RHFSelect native name="typeId">
                    {taskType.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.taskType}
                      </option>
                    ))}
                  </RHFSelect>
                </Stack>
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Time tracking
                  </Typography>
                  <Slider sx={{ width: '80%', alignSelf: 'center' }} />
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>
                      {currentTask?.timeTrackingSpent || 0}h logged
                    </Typography>
                    <Typography>
                      {currentTask?.timeTrackingRemaining || 0}h remaining
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5.8}>
              <Stack spacing={1}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  OriginalEstimate
                </Typography>
                <RHFTextField name="originalEstimate" type="number" />
              </Stack>
            </Grid>
            <Grid item xs={5.8}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                spacing={2}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Time spent
                  </Typography>
                  <RHFTextField name="timeTrackingSpent" type="number" />
                </Stack>
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Time remaining
                  </Typography>
                  <RHFTextField name="timeTrackingRemaining" type="number" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={1}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Description
            </Typography>
            <RHFEditor name="description" />
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={2} mt={3}>
          {isEdit && <Button>Cancel</Button>}
          <Button disabled={isSubmitting} type="submit">
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </Stack>
      </Card>
    </FormProvider>
  );
}
