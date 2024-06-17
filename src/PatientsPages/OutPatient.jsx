import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, 
        Typography, Divider, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function OutPatient() {
  return (
   
    <TableContainer>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
        OutPatient Lists
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
    <Divider sx={{ mb: 2}} />
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Column 1</TableCell>
                          <TableCell>Column 2</TableCell>
                          <TableCell>Column 3</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Row 1, Cell 1</TableCell>
                          <TableCell>Row 1, Cell 2</TableCell>
                          <TableCell>Row 1, Cell 3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Row 2, Cell 1</TableCell>
                          <TableCell>Row 2, Cell 2</TableCell>
                          <TableCell>Row 2, Cell 3</TableCell>
                        </TableRow>
                        {/* Add more rows as needed */}
                      </TableBody>
                    </Table>
                  </TableContainer>
            
  )
}
