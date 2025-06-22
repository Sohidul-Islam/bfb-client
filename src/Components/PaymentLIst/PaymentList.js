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

const PaymentList = () => {
    const { getPayment, deleteAPayment, getPaymentById } = db
    // const [certificates, setCertificates] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { isLoading, refetch, error, data } = useQuery('payment', () =>
        getPayment().then((data) => {
            if (data.length === null || data.length === undefined || data.length <= 0) {
                return [{
                    name: "no data",
                    number: "no data",
                    payment_method: "no data",
                    transection_number: "no data",
                    amount: "no data",
                    isVerified: "no data",
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
    // useEffect(() => {
    //     getAllCertificates().then((data) => setCertificates(data))
    // }, [])

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
    const handleEdit = (id, editedData) => {
        getPaymentById(id, editedData).then(() =>
            refetch()
        )
    };
    const handleDelete = (id) => {
        console.log("cliced");
        deleteAPayment(id).then((data) => {
            refetch();
            console.log("deleted info ", data);
        })
    };

    const inputField = (data) => [
        {
            label: 'Name',
            type: 'text',
            name: function () {
                return "name"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.name,
            disabled: false
        },
        {
            label: 'Number',
            type: 'text',
            name: function () {
                return "number"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.number,
            disabled: false
        },
        {
            label: 'Transaction Number',
            type: 'text',
            name: function () {
                return "transection_number"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.transection_number,
            disabled: false
        },
        {
            label: 'Amount',
            type: 'text',
            name: function () {
                return "amount"
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            defaultValue: data.amount,
            disabled: false
        },
        {
            label: 'Is Verified ? {write: on-process/pending/verified}',
            type: 'text',
            name: function () {
                return "isVerified"
            },
            placeholder: function () { return 'write: on-process/pending/verified' },
            defaultValue: data.isVerified,
            disabled: false
        },
    ]


    const filteredCertificates = data.filter(
        (certificate) =>
            certificate.name.toLowerCase().includes(searchText.toLowerCase()) ||
            certificate.number.toLowerCase().includes(searchText.toLowerCase()) ||
            certificate.isVerified.toLowerCase().includes(searchText.toLowerCase()) ||
            certificate.payment_method.toLowerCase().includes(searchText.toLowerCase()) ||
            certificate.amount.toLowerCase().includes(searchText.toLowerCase()) ||
            certificate.transection_number.toLowerCase().includes(searchText.toLowerCase())
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

export default PaymentList