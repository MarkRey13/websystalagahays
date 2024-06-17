import { Paper, Button, Container, TextField, InputAdornment, Divider, Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from '../Services/Supabase';

const LocalDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ fullname: '', address: '', telephonenumber: '' });

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    console.log('Saving new doctor...', newDoctor);
    try {
      const { data, error } = await supabase.from('local_doctor').insert([newDoctor]);
      if (error) {
        console.error('Error saving new doctor', error.message);
        return;
      }
      setDoctors([...doctors, data[0]]);
      setNewDoctor({ fullname: '', address: '', telephonenumber: '' });
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving new doctor', error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const { data, error } = await supabase.from('local_doctor').select('*');
      if (error) {
        console.error('Error fetching local doctors', error.message);
        return;
      }
      setDoctors(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching local doctors', error.message);
    }
  }

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.telephonenumber.toString().includes(searchQuery)
  );

  return (
    <Container maxWidth="false" sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            color: 'white',
            width: '150px',
            padding: '12px 24px',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
          }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box
            style={{
              marginBottom: '16px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Local Doctors</Typography>
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
                  ml: 2,
                  borderRadius: 2, // Adding borderRadius
                },
              }}
              onChange={handleSearch}
            />
          </Box>
        </Paper>
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Clinic number</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Telephone number</TableCell>
              <TableCell>
                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.clinicnumber}>
                <TableCell>{doctor.clinicnumber}</TableCell>
                <TableCell>{doctor.fullname}</TableCell>
                <TableCell>{doctor.address}</TableCell>
                <TableCell>{doctor.telephonenumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Local Doctor</DialogTitle>
        <DialogContent>
        <TextField
            fullWidth
            disabled
            variant="outlined"
            label="Clinic number"
            sx={{ mb: 2 }}
            value={newDoctor.clinicnumber}
            onChange={(e) => setNewDoctor({ ...newDoctor, fullname: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Full name"
            sx={{ mb: 2 }}
            value={newDoctor.fullname}
            onChange={(e) => setNewDoctor({ ...newDoctor, fullname: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            sx={{ mb: 2 }}
            value={newDoctor.address}
            onChange={(e) => setNewDoctor({ ...newDoctor, address: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Telephone number"
            sx={{ mb: 2 }}
            value={newDoctor.telephonenumber}
            onChange={(e) => setNewDoctor({ ...newDoctor, telephonenumber: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default LocalDoctors;
