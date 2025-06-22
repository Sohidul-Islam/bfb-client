import React, { useState } from 'react'
import { styled } from '@mui/system';
import { Box, Grid, Paper, Collapse, Typography, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CertificateList from '../CertificateList/CertificateList';
import AdminList from '../AdminList/AdminList';
import PaymentList from '../PaymentLIst/PaymentList';
import CollapsibleCard from '../CollapsibleCard/CollapsibleCard';

const AdminHome = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const tabLIst = [
    {
      id: 0,
      listName: 'Certificate List',
      component: <CertificateList />
    },
    {
      id: 1,
      listName: 'Admin List',
      component: <AdminList />
    },
    {
      id: 2,
      listName: 'Payment List',
      component: <PaymentList />
    },
  ]

  return (
    <div className="container mx-auto my-3">
      <Grid container spacing={2} className="w-full">
        {tabLIst.map((value) =>
          <Grid key={value.id} item xs={12} md={12} sm={12} >
            <div className='min-h-[200px] shadow-md rounded-sm'>
              <h1 className="text-center font-bold text-[24px]">{value.listName}</h1>
              <CollapsibleCard>
                {value.component}
              </CollapsibleCard>
            </div>
          </Grid>
        )
        }
      </Grid >
    </div>

  );
}

export default AdminHome