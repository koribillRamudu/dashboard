import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: '100%',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    top: '8px',
  },
  search: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  dialogPaper: {
    width: '600px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  mediumText: {
    fontSize: '1.2rem',
  },
  inputLabel: {
    top: '-8px',
    fontFamily: 'bold',
    fontSize: '20px',
  },
  dialogText: {
    textAlign: 'left',
  },
}));

const Applications = () => {
  const classes = useStyles();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [approvalMessage, setApprovalMessage] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/applicationsData')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

const handleApprove = () => {
  const updatedApplications = applications.map(app => {
    if (app.id === selectedApplication.id) {
      return { ...app, status: 'success' };
    }
    return app;
  });

  updateApplications(updatedApplications);

  axios.post('http://localhost:5000/sendEmail', {  
    recipientEmail: selectedApplication.email,
    subject: 'Application Approved',
    text: `Dear ${selectedApplication.name},\n\nWe are thrilled to inform you that your application has been approved!\n\nPlease proceed with the payment by clicking here:(https://rzp.io/l/SZfKRJA).\n\nLooking forward to having you on board!`
  })
  .then(response => {
    console.log('Email sent successfully');
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });
  axios.post('http://localhost:5000/storeApprovedApplication', selectedApplication)
    .then(response => {
      console.log('Application details stored in txt file');
    })
    .catch(error => {
      console.error('Error storing application details:', error);
    });

  setApplications(updatedApplications);
  setApprovalMessage('Your application approval was successful.');
  setDialogOpen(false);
};


  const handleDeny = () => {
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return { ...app, status: 'denied' };
      }
      return app;
    });

    updateApplications(updatedApplications);

    axios.post('http://localhost:5000/sendEmail', {  
      recipientEmail: selectedApplication.email, 
      subject: 'Application denied',
      text: `Dear ${selectedApplication.name},\n\nYour application has been denied.`
    })
    .then(response => {
      console.log('Email sent successfully');
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });

    setApplications(updatedApplications);
    setApprovalMessage('Your application denial was successful.');
    setDialogOpen(false); 
  };

  const updateApplications = updatedApplications => {
    axios.post('http://localhost:5000/updateApplications', { applications: updatedApplications })
      .then(response => {
        setApplications(updatedApplications);
      })
      .catch(error => {
        console.error('Error updating application data:', error);
      });
  };

  const filterApplications = () => {
    return applications.filter(app => {
      const matchesName = app.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesName && matchesStatus;
    });
  };

  const filteredApplications = filterApplications();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" gutterBottom>Application Dashboard</Typography>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <TextField 
              className={classes.search} 
              variant="outlined" 
              label="Search by Name" 
              value={nameFilter} 
              onChange={e => setNameFilter(e.target.value)} 
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel className={classes.inputLabel}>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="denied">Denied</MenuItem>
              </Select>
            </FormControl>
            {approvalMessage && <Typography variant="body1" color="primary">{approvalMessage}</Typography>}
            <Fade in={true} timeout={500}>
              <List>
                {filteredApplications.map(application => (
                  <div key={application.id}>
                    <ListItem>
                      <ListItemText 
                        primary={`Applicant Name: ${application.name}`} 
                        secondary={
                          <Typography>
                            Education: {application.education}, Personal Info: {application.personalInfo}, 
                            Status: 
                            <span style={{ color: 
                              application.status === 'success' ? 'green' :
                              application.status === 'denied' ? 'red' :
                              'orange'
                            }}>
                              {application.status}
                            </span>
                          </Typography>
                        }
                      />
                      <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        onClick={() => {
                          setSelectedApplication(application);
                          setDialogOpen(true);
                        }}
                      >
                        Review
                      </Button>
                    </ListItem>
                  </div>
                ))}
              </List>
            </Fade>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} classes={{ paper: classes.dialogPaper }}>
        <DialogTitle>Review Application</DialogTitle>
        <DialogContent classes={{ paper: classes.dialogContent }}>
          {selectedApplication && (
            <div className={classes.dialogText}>
              <Typography variant="h6" className={classes.mediumText}>Applicant Name: {selectedApplication.name}</Typography>
              <Typography variant="body1" className={classes.mediumText}>Education: {selectedApplication.education}</Typography>
              <Typography variant="body1" className={classes.mediumText}>Personal Info: {selectedApplication.personalInfo}</Typography>
              <Typography variant="body1" className={classes.mediumText}>Phone Number: {selectedApplication.phoneNumber}</Typography>
              <Typography variant='body1' className={classes.mediumText}>email:{selectedApplication.email}</Typography>
              <Typography variant="body1" color='orange' className={classes.mediumText}>Status:  
              <span style={{ color: 
                              selectedApplication.status === 'success' ? 'green' :
                              selectedApplication.status === 'denied' ? 'red' :
                              'orange'
                            }}>
                              {selectedApplication.status}
                            </span>
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApprove} color="primary">
            Approve
          </Button>
          <Button onClick={handleDeny} color="secondary">
            Deny
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Applications;
