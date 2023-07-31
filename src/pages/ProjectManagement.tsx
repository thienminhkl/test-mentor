//axios
import axios from 'axios';
//react
import { useEffect, useState } from 'react';
//@mui
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//types
import { Projects } from '~/type/projects.type';
import { User } from '~/type/user.type';
//hooks
import { CYBERTOKEN } from '~/hooks/const';
//component
import ProjectAddMemberPopup from '~/components/ProjectAddMemberPopup';
import ProjectMemberPopup from '~/components/ProjectMemberPopup';

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
  const [projects, setProject] = useState<Projects[]>([]);
  const [listUser, setListUser] = useState<User[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleGetProject = async () => {
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/getAllProject`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
      });
      setProject(resp.data.content);
    } catch (error: any) {
      console.error(error);
    }
  };
  const handleGetUser = async () => {
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Users/getUser`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
          Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhbmhjdW9uZ0BnbWFpbC5jb20iLCJuYmYiOjE2OTA3NzQ3MjcsImV4cCI6MTY5MDc3ODMyN30.RP_NLAKl6AijR3MUSS9DORn2QkZkkEc8xaSgWD3HTBc`,
        },
      });
      setListUser(resp.data.content);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (id: string | number) => {
    if (window.confirm('Are you sure to delete this project')) {
      try {
        const resp = await axios({
          url: `/api/Project/deleteProject?projectId=${id}`,
          method: 'delete',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhbmhjdW9uZ0BnbWFpbC5jb20iLCJuYmYiOjE2OTA3NzQ3MjcsImV4cCI6MTY5MDc3ODMyN30.RP_NLAKl6AijR3MUSS9DORn2QkZkkEc8xaSgWD3HTBc`,
          },
        });
        setListUser(resp.data.content);
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetProject();
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
    <>
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
        <TableContainer sx={{ maxHeight: 600 }}>
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
              {projects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
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
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteProject(row.id)}
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
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
