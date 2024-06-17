import {Table, TableHead, TableRow, TableCell, 
        TableContainer, Paper, TableBody, Button, Box, Typography} from '@mui/material';


const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};
export default function CurrentInPatient() {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell sx={verticalLine}>Patient Number</TableCell>
        <TableCell sx={verticalLine}>Patient Name</TableCell>
        <TableCell sx={verticalLine}>Ward Name</TableCell>
        <TableCell sx={verticalLine}>Bed Number</TableCell>
        <TableCell sx={verticalLine}><Typography sx={{textAlign:'center', fontSize:'14px'}}>Action</Typography></TableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell sx={verticalLine}>Row 1, Cell 1</TableCell>
        <TableCell sx={verticalLine}>Row 1, Cell 2</TableCell>
        <TableCell sx={verticalLine}>Row 1, Cell 3</TableCell>
        <TableCell sx={verticalLine}>Row 1, Cell 3</TableCell>
        <TableCell sx={verticalLine}>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Button 
               color="error"
               sx={{
                    width: '150px',
                    backgroundColor: '#0288d1',
                    '&:hover': { backgroundColor: '#193b4d' },
                    borderRadius: '5px',
                    color: 'white',
                    mb: 1,
                   
                    fontSize: '0.70rem',
                    }}>Discharge</Button>
            </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={verticalLine}>Row 2, Cell 1</TableCell>
            <TableCell sx={verticalLine}>Row 2, Cell 2</TableCell>
            <TableCell sx={verticalLine}>Row 2, Cell 3</TableCell>
            <TableCell sx={verticalLine}>Row 2, Cell 3</TableCell>
            <TableCell sx={verticalLine}>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Button 
               color="error"
               sx={{
                    width: '150px',
                    backgroundColor: '#0288d1',
                    '&:hover': { backgroundColor: '#193b4d' },
                    borderRadius: '5px',
                    color: 'white',
                    mb: 1,
                   
                    fontSize: '0.70rem',
                    }}>Discharge</Button>
            </Box>
            </TableCell>
          </TableRow>
          
  
      
    </TableBody>
    
  </Table>
  </TableContainer>
  );
}
