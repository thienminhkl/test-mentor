//react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
//component
import ProjectAddMemberPopup from '~/components/ProjectAddMemberPopup';
import ProjectMemberPopup from '~/components/ProjectMemberPopup';
//redux
import {
  handleDeleteProject,
  handleGetListProjects,
  handleGetProjectCategory,
} from '~/redux/slices/projectSlides';
import { handleGetListUser } from '~/redux/slices/userSlides';
import { RootState, dispatch, useSelector } from '~/redux/store';

//-------------------------------------------------------------------------------
interface Column {
  id: number;
  label: string;
  align: 'right' | 'center' | 'left';
}
const columns: Column[] = [
  { id: 1, label: 'id', align: 'left' },
  { id: 2, label: 'Project name', align: 'left' },
  { id: 3, label: 'Category', align: 'left' },
  { id: 4, label: 'Creator', align: 'left' },
  { id: 5, label: 'Members', align: 'center' },
  { id: 6, label: 'Action', align: 'right' },
];

//-------------------------------------------------------------------------------

export default function ProjectManagement() {
  const nav = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { listUser, userProfile } = useSelector(
    (state: RootState) => state.user
  );
  const { listProjects } = useSelector((state: RootState) => state.project);

  console.log(listProjects);

  useEffect(() => {
    dispatch(handleGetListUser());
    dispatch(handleGetListProjects());
    dispatch(handleGetProjectCategory());
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Stack m={2}>
      <Stack>
        <Typography variant="h3">Project Management</Typography>
      </Stack>
      <Stack direction={'row'} spacing={2} my={2}>
        <Button variant="outlined" color="success">
          Sort age
        </Button>
        <Button variant="outlined" color="success">
          Clear filters
        </Button>
        <Button variant="outlined" color="success">
          Clear filters and sorters
        </Button>
      </Stack>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ fontSize: '1.2rem' }}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      bgcolor:
                        row.creator.id == userProfile?.id ? 'gray' : 'white',
                    }}
                  >
                    <TableCell sx={{ fontSize: '1.2rem' }}>{row.id}</TableCell>
                    <TableCell sx={{ fontSize: '1.2rem' }}>
                      {row.projectName}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem' }}>
                      {row.categoryName}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem' }}>
                      {row.creator.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem' }} align="center">
                      <Stack direction={'row'}>
                        <ProjectMemberPopup
                          members={row.members}
                          projId={row.id}
                        />
                        <ProjectAddMemberPopup
                          listUser={listUser}
                          projId={row.id}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem' }} align="right">
                      <IconButton
                        color="primary"
                        onClick={() => nav(`/projectDetails/${row.id}`)}
                      >
                        <PreviewIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => nav(`/editProject/${row.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => dispatch(handleDeleteProject(row.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={listProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
}
