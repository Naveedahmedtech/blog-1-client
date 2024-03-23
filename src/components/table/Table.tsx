import  { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const MyTable = ({
    columns,
    data,
    totalCount,
    onPageChange,
    renderRowActions = null,
    rowsPerPageOptions = [5, 10, 25],
}:any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
        onPageChange(newPage + 1, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onPageChange(1, parseInt(event.target.value, 10));
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell> {/* Added numbering header */}
                            {columns.map((column:any) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth || 'auto' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {renderRowActions && <TableCell align="right">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any, rowIndex:any) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id || `page-${page}-index-${rowIndex}`}>
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + rowIndex + 1} {/* Row numbering */}
                                </TableCell>
                                {columns.map((column:any) => (
                                    <TableCell key={column.id} align={column.align || 'left'}>
                                        {column.render ? column.render(row) : row[column.id]}
                                    </TableCell>
                                ))}
                                {renderRowActions && (
                                    <TableCell align="right">
                                        {renderRowActions(row)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MyTable;
