import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const MyTable = ({
    columns,
    data,
    totalCount,
    renderRowActions = null,
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
}: any) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial Number</TableCell> {/* Add Serial Number column */}
                            {columns.map((column: any) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth || 'auto', cursor: 'pointer' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {renderRowActions && <TableCell align="right">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any, index: number) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                <TableCell component="th" scope="row">
                                    {(page - 1) * rowsPerPage + index + 1} {/* Calculate serial number */}
                                </TableCell>
                                {columns.map((column: any) => (
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MyTable;
