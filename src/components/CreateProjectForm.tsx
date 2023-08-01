import * as Yup from 'yup';
//@hookform
import { yupResolver } from '@hookform/resolvers/yup';
//@mui
import { Button, Card, Stack, Typography } from '@mui/material';
//react
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
//hooks
import FormProvider from '~/hooks/FormProvider';
import RHFEditor from '~/hooks/RHFEditor';
import { RHFSelect } from '~/hooks/RHFSelect';
import RHFTextField from '~/hooks/RHFTextField';
//redux
import {
  handleAddProject,
  handleGetProjectCategory,
  handleUpdateProject,
} from '~/redux/slices/projectSlides';
import { dispatch, useSelector } from '~/redux/store';
//type
import { Projects } from '~/type/projects.type';
//-------------------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentProject?: Projects;
};

type FormValuesProps = {
  projectName: string;
  description: string;
  categoryId: number;
  alias?: string;
};
//-------------------------------------------------------------------------------

export default function CreateProjectForm({ isEdit, currentProject }: Props) {
  const categories = useSelector((state) => state.project.projectCategory);

  const NewProjectSchema = Yup.object().shape({
    projectName: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    categoryId: Yup.number().required('Category is required'),
  });

  const defaultValues = useMemo(
    () => ({
      projectName: currentProject?.projectName || '',
      description: currentProject?.description || '',
      categoryId: currentProject?.categoryId || categories[0].id,
      alias: currentProject?.alias || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProject]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentProject) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProject]);

  useEffect(() => {
    dispatch(handleGetProjectCategory());
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    const createData = { ...data, alias: data.projectName };
    const updateData = {
      id: currentProject?.id,
      projectName: data.projectName,
      creator: 0,
      description: data.description,
      categoryId: data.categoryId,
    };
    if (isEdit) {
      dispatch(handleUpdateProject(updateData, currentProject));
    } else {
      dispatch(handleAddProject(createData));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="projectName" label="Project Name" />

          <Stack spacing={1}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Description
            </Typography>

            <RHFEditor name="description" />
          </Stack>
          <RHFSelect native name="categoryId">
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.projectCategoryName}
              </option>
            ))}
          </RHFSelect>
        </Stack>
        <Stack direction={'row'} spacing={2} mt={3}>
          {isEdit && <Button>Cancel</Button>}
          <Button disabled={isSubmitting} type="submit">
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </Stack>
      </Card>
    </FormProvider>
  );
}
