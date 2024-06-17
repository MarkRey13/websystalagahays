import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Box, InputAdornment, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';
import { useNavigate } from 'react-router-dom';

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};

const Appointment = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    staffNumber: '',
    clinicNumber: '',
    examinationRoom: '',
    dateAndTime: ''
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const startConsult = () => {
    navigate('/dashboard/Patient/allPatientLists');
  };

  const handleAddClick = () => {
    setSelectedAppointment(null);
    setNewAppointment({ staffNumber: '', clinicNumber: '', examinationRoom: '', dateAndTime: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        staffnumber: newAppointment.staffNumber,
        clinicnumber: newAppointment.clinicNumber,
        examinationroom: newAppointment.examinationRoom,
        dateandtime: newAppointment.dateAndTime,
      };

      let response;
      if (selectedAppointment) {
        response = await supabase
          .from('patient_appointment')
          .update(dataToSave)
          .eq('appointmentnumber', selectedAppointment.appointmentnumber);
      } else {
        response = await supabase
          .from('patient_appointment')
          .insert([dataToSave]);
      }

      const { error } = response;
      if (error) {
        console.error('Error saving appointment:', error.message);
        return;
      }

      fetchAppointments();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving appointment:', error.message);
    }
  };

  const handleDelete = async (appointmentnumber) => {
    try {
      const { error } = await supabase
        .from('patient_appointment')
        .delete()
        .eq('appointmentnumber', appointmentnumber);
      if (error) {
        console.error('Error deleting appointment:', error.message);
        return;
      }
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
    }
  };

  const handleUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      staffNumber: appointment.staffnumber,
      clinicNumber: appointment.clinicnumber,
      examinationRoom: appointment.examinationroom,
      dateAndTime: appointment.dateandtime,
    });
    setOpenDialog(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = appointments.filter((appointment) =>
      Object.values(appointment).some(val =>
        String(val).toLowerCase().includes(value)
      )
    );
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const { data, error } = await supabase
        .from('patient_appointment')
        .select('*');
      if (error) {
        console.error('Error fetching appointment lists:', error.message);
        return;
      }
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error('Error fetching appointment lists:', error.message);
    }
  }

  return (
    <Container display="flex" sx={{ mt: -5, mb: 2 }}>
      <Grid container spacing={5} justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ borderRadius: 3, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                  fontSize: '14px',
                },
              }}
            />
          </Box>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', ml: 'auto', width: '100%' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={verticalLine}>Appointment Number</TableCell>
                        <TableCell sx={verticalLine}>Staff Number</TableCell>
                        <TableCell sx={verticalLine}>Clinic Number</TableCell>
                        <TableCell sx={verticalLine}>Date and Time</TableCell>
                        <TableCell sx={verticalLine}>Examination Room</TableCell>
                        <TableCell sx={{ verticalLine, textAlign: 'center' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAppointments.map((appointmentRecs) => (
                        <TableRow key={appointmentRecs.appointmentnumber}>
                          <TableCell sx={verticalLine}>{appointmentRecs.appointmentnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.staffnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.clinicnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.dateandtime}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.examinationroom}</TableCell>
                          <TableCell sx={verticalLine}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Button
                                onClick={startConsult}
                                sx={{
                                  width: '150px',
                                  backgroundColor: '#0288d1',
                                  '&:hover': { backgroundColor: '#193b4d' },
                                  borderRadius: '5px',
                                  color: 'white',
                                  mr: 1,
                                  mb: 1,
                                  fontSize: '0.70rem',
                                }}
                              >
                                Start Consultation
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for Add/Update functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{selectedAppointment ? 'Update' : 'Add'} Patient Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Staff Number"
            name="staffNumber"
            value={newAppointment.staffNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Clinic Number"
            name="clinicNumber"
            value={newAppointment.clinicNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Examination Room"
            name="examinationRoom"
            value={newAppointment.examinationRoom}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
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
};

export default Appointment;
