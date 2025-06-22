import React, { useState } from 'react'
import { Box, Grid, Paper, Collapse, Typography, Button, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const CollapsibleCard = ({ children, data }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <div>
            <div>
                {/* <Button variant="outlined" onClick={handleToggle}>
                    {open ? "Collapse" : "Expand"}
                </Button> */}
                <IconButton aria-label="down-arrow" onClick={handleToggle}>
                    {open ? <KeyboardArrowUpIcon sx={{ color: "#000000" }} /> : <KeyboardArrowDownIcon sx={{ color: "#000000" }} />}
                </IconButton>
                <Collapse in={open}>
                    {children}
                </Collapse>
            </div>
        </div>
    )
}

export default CollapsibleCard