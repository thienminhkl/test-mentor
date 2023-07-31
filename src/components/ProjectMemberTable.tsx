//react
import { ChangeEvent, useState } from 'react';
//axios
import axios from 'axios';
//@mui
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//type
import { Member } from '~/type/projects.type';
//hooks
import { CYBERTOKEN } from '~/hooks/const';
//-------------------------------------------------------------------------------

type Props = {
  members: Member[];
  projId: string | number;
};

export default function ProjectMemberTable({ members, projId }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDeleteMember = async (uId: string | number) => {
    if (window.confirm('Are you sure to delete this user out of project')) {
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/removeUserFromProject`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer `,
          },
          data: {
            projectId: projId,
            userId: uId,
          },
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Members
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.userId}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.avatar}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteMember(row.userId)}>
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
