import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    IconButton,
    Tooltip,
    Collapse,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import db from '../../utilities/db.control'
import DialogueBox from '../DialogueBox/DialogueBox';
import TableDataRow from '../TableDataRow/TableDataRow';
import useAuth from './../../hooks/useAuth';
import { async } from '@firebase/util';
import PreLoader from '../PreLoader/PreLoader';

const AdminList = () => {
    const { getAllAdmin, deleteAadmin, UpdateUserById } = db
    const { updateUserInformation, user, setUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { isLoading, refetch, error, data } = useQuery('admin', () =>
        getAllAdmin().then((data) => {
            if (data.length === null || data.length === undefined || data.length <= 0) {
                return [{
                    email: "no data",
                    displayName: "no data",
                    role: "no data",
                }]
            }
            else {
                return data;
            }
        })
    );

    if (isLoading) {
        return <div><PreLoader size={100} /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleEdit = (user_id, data) => {
        // code to edit the certificate
        if (user.email !== data.email) {
            UpdateUserById(user_id, data).then((data) => console.log(data))
            updateUserInformation(data);
            setUser({
                displayName: data?.displayName,
                email: data?.email
            })

            setIsOpen(true);
            setIsValid(true);
        }
        else {
            setIsOpen(true);
            setIsValid(false);
        }

    };
    const handleDelete = async (id) => {
        let getData = data.find((data) => data._id === id);
        console.log("delete ", getData.email);

        if (getData.email === user.email) {
            setIsOpen(true);
            setIsValid(false);
        }
        else {
            deleteAadmin(id).then(() => {
                refetch();
                // deleteUser(getData?.email);
            })
        }

    };

    const inputField = (data) => [
        {
            label: 'Email',
            type: 'email',
            name: function () {
                return "email"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.email,
            disabled: true
        },
        {
            label: 'Name',
            type: 'text',
            name: function () {
                return "displayName"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.displayName,
            disabled: true
        },
        {
            label: 'Role',
            type: 'text',
            name: function () {
                return "role"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.role,
            disabled: false
        },
    ]




    const filteredAdmin = data.filter(
        (user) =>
            user?.displayName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchText.toLowerCase())
        // user.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
        // user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-2">
            <TextField
                label="Search"
                value={searchText}
                onChange={handleSearch}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Collapse in={isOpen}>
                    <Alert
                        severity={`${isValid ? "success" : "error"}`}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {isValid ? `Congratulations! updated successfully` : `You must be a current user to update it`}
                    </Alert>
                </Collapse>
                <Table className='overflow-x-auto'>
                    <TableHead>
                        <TableRow>
                            {Object.keys(data[0]).map((col, index) =>
                                <Fragment key={index}>
                                    {col != "_id" && <TableCell >{col.replaceAll("_", " ").toUpperCase()}</TableCell>}
                                </Fragment>
                            )}
                            <TableCell >{"Edit/Delete".toUpperCase()}</TableCell>
                            {/* {Col.map((column) => <TableCell key={column.id}>{column.name}</TableCell>)} */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAdmin
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((admin) => (
                                <Fragment key={admin._id}>
                                    {admin?.email !== user.email && <TableDataRow data={admin} keyValues={Object.keys(data[0])} handleDelete={handleDelete} refetch={refetch} inputField={inputField} UpdateInfoByID={handleEdit} isAction={true} />}
                                    {admin?.email === user.email && <TableDataRow data={admin} keyValues={Object.keys(data[0])} handleDelete={handleDelete} refetch={refetch} inputField={inputField} UpdateInfoByID={handleEdit} isAction={false} />}
                                </Fragment>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div >
    );



}

export default AdminList