import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import faker from 'faker'; // Import faker for generating fake data

function Dashboard() {
  // Generate fake data
  const students = Array.from({ length: 6 }, () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    grade: faker.random.arrayElement(['A', 'B', 'C', 'D']),
  }));

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {students.map((student, index) => (
          <Grid key={index} item xs={12} md={6} lg={3}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                {student.name}
              </Typography>
              <Typography>Email: {student.email}</Typography>
              <Typography>Grade: {student.grade}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;