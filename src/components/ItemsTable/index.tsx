import React, { useState, useMemo } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

interface Props {
  data: String[],
  handleRowClick: Function
}

export default function ItemsTable({ data, handleRowClick }: Props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ).map((item) => <TableRow onClick={() => handleRowClick(item)} style={{cursor: "pointer"}} hover>
        <TableCell>{item}</TableCell>
      </TableRow>
      ),
      [data, page, rowsPerPage]
  );

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650, minHeight: 400 }} aria-label="simple table">
          <TableBody>
            { visibleRows }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}