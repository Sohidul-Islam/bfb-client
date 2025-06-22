import React, { Fragment, useEffect, useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import db from '../../utilities/db.control'
import DialogueBox from '../DialogueBox/DialogueBox';
import TableDataRow from '../TableDataRow/TableDataRow';
import PreLoader from '../PreLoader/PreLoader';

const CertificateList = () => {
    const { getAllCertificates, deleteACertificates, UpdateCertificatesById } = db
    // const [certificates, setCertificates] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { isLoading, refetch, error, data } = useQuery('certificate', () =>
        getAllCertificates().then((data) => {
            if (data.length === null || data.length === undefined || data.length <= 0) {
                return [{
                    certificate_id: "no data",
                    ref_no: "no data",
                    firstname: "no data",
                    lastname: "no data",
                    date_of_issue: "no data",
                    duration_of_experience: "no data",
                    list_of_combine_certificate_name: "no data",
                    description: "no data"
                }]
            }
            else {
                return data;
            }
        })
    );

    if (isLoading) {
        return <PreLoader size={100} />;
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

    const handleEdit = (user_id, editedData) => {
        // code to edit the certificate
        UpdateCertificatesById(user_id, editedData).then((result) =>
            refetch()
        )
        // return openDialog(true);
    };

    const handleDelete = (id) => {
        deleteACertificates(id).then((data) => {
            refetch();
        })
    };

    const inputField = (data) => [
        {
            label: 'Certificate Id',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.certificate_id,
            disabled: true,
        },
        {
            label: 'Ref No',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.ref_no,
            disabled: false
        },
        {
            label: 'First Name',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.firstname,
            disabled: false
        },
        {
            label: 'Last Name',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.lastname,
            disabled: false
        },
        {
            label: 'Date of Issue',
            type: 'date',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
            defaultValue: data.date_of_issue,
            disabled: false
        },
        {
            label: 'Duration of Experience',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
            defaultValue: data.duration_of_experience,
            disabled: false
        },
        {
            label: 'List of Combine Certificate Name',
            type: 'textArea',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
            defaultValue: data.list_of_combine_certificate_name,
            disabled: false
        },
        {
            label: 'description',
            type: 'textArea',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
            defaultValue: data.description,
            disabled: false
        },
    ]


    const filteredCertificates = data.filter(
        (certificate) =>
            certificate?.firstname?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            certificate?.lastname?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            certificate?.certificate_id?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            certificate?.date_of_issue?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            certificate?.ref_no?.toLowerCase()?.includes(searchText.toLowerCase())
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
                <Table className='overflow-x-auto'>
                    <TableHead>
                        <TableRow>
                            {/* {Col.map((column) => <TableCell key={column.id}>{column.name}</TableCell>)} */}
                            {Object.keys(data[0]).map((col, index) =>
                                <Fragment key={index}>
                                    {col != "_id" && <TableCell >{col.replaceAll("_", " ").toUpperCase()}</TableCell>}
                                </Fragment>
                            )}
                            <TableCell >{"Edit/Delete".toUpperCase()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCertificates
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((certificate) => (
                                <TableDataRow key={certificate._id} data={certificate} keyValues={Object.keys(data[0])} handleDelete={handleDelete} refetch={refetch} UpdateInfoByID={handleEdit} inputField={inputField} isAction={true} />
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

export default CertificateList