import React, { Fragment, useState } from 'react'
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
import DialogueBox from '../DialogueBox/DialogueBox';
const TableDataRow = ({ data, handleDelete, refetch, inputField, keyValues, UpdateInfoByID, isAction }) => {
    const [isOpen, setIsOpen] = useState(false);



    const handleEdit = (data) => {
        // code to edit the certificate
        setIsOpen(true);
        // return openDialog(true);
    };
    return (
        <>
            <TableRow >
                {
                    keyValues.map((key, index) =>
                        <Fragment key={index}>
                            {key !== "_id" && <TableCell className='capitalize' >{data[key]}</TableCell>}
                        </Fragment >)
                }

                {isAction === true && <TableCell>
                    <IconButton onClick={() => handleEdit(data)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(data._id)}>
                        <DeleteIcon />
                    </IconButton>
                    {isOpen === true && <DialogueBox setIsOpen={setIsOpen} isOpen={isOpen} certificate={data} refetch={refetch} inputField={inputField} UpdateInfoByID={UpdateInfoByID} />}
                </TableCell>}
                {isAction === false && <TableCell>
                    <IconButton disabled onClick={() => handleEdit(data)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton disabled onClick={() => handleDelete(data._id)}>
                        <DeleteIcon />
                    </IconButton>
                    {isOpen === true && <DialogueBox setIsOpen={setIsOpen} isOpen={isOpen} certificate={data} refetch={refetch} inputField={inputField} UpdateInfoByID={UpdateInfoByID} />}
                </TableCell>}
            </TableRow>
        </>


    )
}

export default TableDataRow