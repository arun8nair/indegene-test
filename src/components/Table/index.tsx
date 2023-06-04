import React, { useState, useMemo } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
//import TableSortLabel from '@mui/material/TableSortLabel';
import { DataObject } from "../../interfaces"; 
import "./styles.css";

interface Props {
  data: DataObject[]
}

export default function RawTable({ data }: Props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      //onRequestSort(event, property);
    console.log("ev1", event, property)
  };

  const tableHeader: any[] = [];
  let visibleRows: any[] = [];

  const resolveValue = (item: DataObject, property: string): any => {
    if (typeof item[property as keyof DataObject] === "object") {
      let tableCell = [];
      for(var i in (item as any)[property]) {
        tableCell.push(<TableCell style={{borderBottom: 0}} align="center">{(item as any)[property][i]}</TableCell>)
      }
      return tableCell;
    } else {
      return (item as any)[property];
    }
  };

  for ( var item in data[0] ) {
    if(typeof data[0][item as keyof DataObject] === "object") {
      tableHeader.push(<TableRow ><TableCell colSpan={3} align="center">{item}</TableCell></TableRow>);
      let tableGroup = [];
      for (let i in (data[0]as any)[item]) {
        tableGroup.push(<TableCell>{i}</TableCell>)
      }
      tableHeader.push(<TableRow>{tableGroup}</TableRow>)
    }else {
      tableHeader.push(
        <TableCell 
        //sortDirection={orderBy === headCell.id ? order : false}
        >
          {item}
        </TableCell>
      )
    }
  }

  visibleRows = useMemo(
    () =>
      data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ).map((item) => {
        let itemDetails = [];
        for(var prop in item) {
          itemDetails.push(<TableCell>
            {resolveValue(item, prop)}
          </TableCell>
          )
        }
        return (
          <TableRow
            //key={item}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            { itemDetails }
          </TableRow>
        )
      }
    ),
    [data, page, rowsPerPage]
  );

  return (
    <Paper>
      <TableContainer>
        <Table className="raw-table" stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              { tableHeader }
            </TableRow>
          </TableHead>
          <TableBody>
            { visibleRows }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={data.length}
        rowsPerPage={30}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}