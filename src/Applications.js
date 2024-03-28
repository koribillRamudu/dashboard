import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, List, ListItem, ListItemText, TextField, Container, FormControl, InputLabel, Select, MenuItem, Grid, Divider, TextareaAutosize } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width:'100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  search: {
    marginBottom: theme.spacing(2),
    marginTop: '1%',
  },
  reviewSection: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width:'100%',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  reviewTitle: {
    marginBottom: theme.spacing(2),
  },
  fieldContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  fieldLabel: {
    fontWeight: 'bold',
    marginRight: theme.spacing(-108),
    width: '500px',
  },
  information: {
    flex: 4,
  },
  InputLabel: {
    marginTop: '-10%',
    position: 'absolute',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  animatedElement: {
    animation: '$fadeIn 0.5s ease-out',
  },

  // Example animation using CSS transitions
  transitionElement: {
    transition: 'transform 0.3s ease-out',
  },

  // Colors for different statuses
  success: {
    color: 'green',
  },
  deny: {
    color: 'red',
  },
  pending: {
    color: 'orange',
  },
}));

const ApplicationDashboard = () => {
  const classes = useStyles();

  // State for applications, selected application, denial reason, filters, and search query
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [denyReason, setDenyReason] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');
  const [denyMessage, setDenyMessage] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for applications (replace with API call)
  useEffect(() => {
    // Mock data
    const mockApplications = [
      { id: 1, name: 'Ramudu', education: 'B.E. Computer Science', personalInfo: 'Male, 25 years', details: 'Application details 1', PhoneNumber: '800819691', email: 'sekharramudu9054@gmail.com', status: 'pending' },
      { id: 2, name: 'sekhar', education: 'B.A', personalInfo: 'male, 23 years', details: 'Application details 2', PhoneNumber: '800324134', email: 'sekhar@gmail.com', status: 'success' },
      { id: 3, name: 'laxmi', education: 'M.Sc. Mathematics', personalInfo: 'Female, 27 years', details: 'Application details 3', PhoneNumber: '803567811', email: 'laxmi@gmail.com', status: 'denied' },
      { id: 1, name: 'Likitha', education: 'B.Tech. EEE', personalInfo: 'Female, 23 years', details: 'Application details 1', PhoneNumber: '800819698', email: 'likithadurgalla@gmail.com', status: 'success' },

    ];

    setApplications(mockApplications);
  }, []);

  // Function to approve an application
  const approveApplication = () => {
    // Update status to "success"
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return { ...app, status: 'success' };
      }
      return app;
    });
    setApplications(updatedApplications);
    // Update UI to reflect approval
    setSelectedApplication(null);
    setApprovalMessage('Application approved and status updated to "success".');
  };

  // Function to deny an application
  const denyApplication = () => {
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return { ...app, status: 'denied' };
      }
      return app;
    });
    setApplications(updatedApplications);
    setDenyMessage(`Application denied. Reason: ${denyReason}. Email sent to applicant.`);
    // Update UI to reflect denial
    setSelectedApplication(null);
    setDenyReason('');
  };

  // Function to filter applications based on name and status
  const filterApplications = () => {
    let filteredApps = [...applications];

    if (nameFilter) {
      filteredApps = filteredApps.filter(app => app.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    if (statusFilter !== 'all') {
      filteredApps = filteredApps.filter(app => app.status === statusFilter);
    }

    return filteredApps;
  };

  const filteredApplications = filterApplications();
    const pendingApplications = filteredApplications.filter(app => app.status === 'pending');
    const successApplications = filteredApplications.filter(app => app.status === 'success');
    const deniedApplications = filteredApplications.filter(app => app.status === 'denied');
  
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h4" gutterBottom>Application Dashboard</Typography>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} md={9}>
            <Paper className={classes.paper}>
              <TextField className={classes.search} variant="outlined" label="Search by Name" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.InputLabel}>Status Filter</InputLabel>
                <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="denied">Denied</MenuItem>
                </Select>
              </FormControl>
              {approvalMessage && <Typography variant="body1" color="primary">{approvalMessage}</Typography>}
              {denyMessage && <Typography variant="body1" color="error">{denyMessage}</Typography>}
              <List>
                {pendingApplications.map(application => (
                  <ListItem key={application.id}>
                    <ListItemText primary={`Applicant Name: ${application.name}`} secondary={`Education: ${application.education}, Personal Info: ${application.personalInfo}`} />
                    <Button variant="contained" color="primary" className={`${classes.button}`} onClick={() => setSelectedApplication(application)}>Review</Button>
                  </ListItem>
                ))}
                {successApplications.map(application => (
                  <ListItem key={application.id}>
                    <ListItemText primary={`Applicant Name: ${application.name}`} secondary={`Education: ${application.education}, Personal Info: ${application.personalInfo}`} />
                    <Button variant="contained" color="primary" className={`${classes.button}`} onClick={() => setSelectedApplication(application)}>Review</Button>
                  </ListItem>
                ))}
                {deniedApplications.map(application => (
                  <ListItem key={application.id}>
                    <ListItemText primary={`Applicant Name: ${application.name}`} secondary={`Education: ${application.education}, Personal Info: ${application.personalInfo}`} />
                    <Button variant="contained" color='primary' className={`${classes.button}`} onClick={() => setSelectedApplication(application)}>Review</Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
  
        {/* Application review section */}
        {selectedApplication && (
          <Paper className={classes.reviewSection}>
            <Typography variant="h5" gutterBottom className={classes.reviewTitle}>Review Application</Typography>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Applicant Name:</Typography>
              <Typography variant="body1" className={classes.information}>{selectedApplication.name}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Education:</Typography>
              <Typography variant="body1" className={classes.information}>{selectedApplication.education}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Personal Info:</Typography>
              <Typography variant="body1" className={classes.information}>{selectedApplication.personalInfo}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Phone Number:</Typography>
              <Typography variant="body1" className={classes.information}>{selectedApplication.PhoneNumber}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Email:</Typography>
              <Typography variant="body1" className={classes.information}>{selectedApplication.email}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldLabel}>Status:</Typography>
              <Typography variant="body1" className={classes.information} style={selectedApplication.status === 'success' ? { color: 'green' } : selectedApplication.status === 'denied' ? { color: 'red' } : { color: 'orange' }}>{selectedApplication.status}</Typography>
            </div>
            <Divider className={classes.divider} />
            {selectedApplication.status === 'pending' && (
              <>
                <Button variant="contained" color="primary" className={classes.button} onClick={approveApplication}>Approve</Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => setDenyReason('')}>Deny</Button>
                <TextareaAutosize rowsMin={3} placeholder="Reason for denial" value={denyReason} onChange={e => setDenyReason(e.target.value)} />
                <Button variant="contained" color="secondary" className={classes.button} onClick={denyApplication}>Submit Denial</Button>
              </>
            )}
          </Paper>
        )}
      </Container>
    );
  };
  
  export default ApplicationDashboard;  