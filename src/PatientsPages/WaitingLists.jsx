import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, 
  Typography, Divider, Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};
export default function WaitingLists() {
return (
 
  <TableContainer>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
      Waiting Lists
    </Typography>
    

    <TextField
      variant="outlined"
      placeholder="Search"
      sx={{ ml: 2, borderRadius: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2, // Adding borderRadius
          },
        }}
      />
      
  </Box>
       <Divider sx={{ mb: 2 }} />
          

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={verticalLine}>Column 1</TableCell>
                        <TableCell sx={verticalLine}>Column 2</TableCell>
                        <TableCell sx={verticalLine}>Column 3</TableCell>
                        <TableCell sx={verticalLine}><Typography sx={{textAlign:'center', fontSize:'14px'}}>Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={verticalLine}>Row 1, Cell 1</TableCell>
                        <TableCell sx={verticalLine}>Row 1, Cell 2</TableCell>
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
                                    }}>Allocate Ward</Button>
                            </Box>
                            </TableCell>
                      </TableRow>
                     
                    </TableBody>
                  </Table>
                </TableContainer>
          
)
}
