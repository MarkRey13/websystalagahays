import * as React from 'react';
import { Container, Grid, Paper, TextField, 
        InputAdornment, MenuItem, Select, FormControl, InputLabel,
        Table, TableContainer, TableHead, TableBody, TableRow, TableCell, 
        Typography, Divider, Box, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Wards() {
  const [wardName, setWardName] = React.useState('');

  const handleWardChange = (event) => {
    setWardName(event.target.value);
  };

  return (
    <Container display="flex" sx={{ mt: -5, mb: 2 }}>
      <Grid container spacing={5} justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:5 }}>

              <FormControl variant="outlined" sx={{ minWidth: 200, mr: 2 }}>
                <InputLabel>Ward Name</InputLabel>
                <Select
                  value={wardName}
                  onChange={handleWardChange}
                  label="Ward Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Ward 1">Ward 1</MenuItem>
                  <MenuItem value="Ward 2">Ward 2</MenuItem>
                  <MenuItem value="Ward 3">Ward 3</MenuItem>
                  {/* Add more wards as needed */}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                placeholder="Search"
                sx={{ borderRadius: 1, ml: 'auto' }} // Move to the right
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    ml: 2, borderRadius: 2, // Adding borderRadius
                  },
                }}
              />
            </Box>
          <Paper sx={{ p: 10 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 , mb: -10}}>
        Available Beds
        <Divider  sx={{ mb: 10 }} />

      </Typography>
     
    </Box>
    
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell>Ward Number</TableCell>
                          <TableCell>Ward Name</TableCell>
                          <TableCell>Bed Number</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Row 1, Cell 1</TableCell>
                          <TableCell>Row 1, Cell 1</TableCell>
                          <TableCell>Row 1, Cell 2</TableCell>
                          <TableCell>Row 1, Cell 3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Row 2, Cell 1</TableCell>
                          <TableCell>Row 2, Cell 2</TableCell>
                          <TableCell>Row 2, Cell 2</TableCell>

                          <TableCell>Row 2, Cell 3</TableCell>
                        </TableRow>
                        {/* Add more rows as needed */}
                      </TableBody>
                    </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
