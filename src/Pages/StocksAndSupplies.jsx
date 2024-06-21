import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Container,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Grid,
  Typography,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import BusinessIcon from '@mui/icons-material/Business';

export default function StocksAndSupplies() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pharmaceuticalSupplies, setPharmaceuticalSupplies] = useState([]);
  const [surgicalAndNonSurgicalSupplies, setSurgicalAndNonSurgicalSupplies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategory === 'Pharmaceutical') {
      fetchPharmaceuticalSupplies();
    } else if (selectedCategory === 'Surgical and Non-Surgical') {
      fetchSurgicalAndNonSurgicalSupplies();
    } else if (selectedCategory === 'Suppliers') {
      fetchSuppliers();
    }
  }, [selectedCategory]);

  const fetchData = async (tableName, setDataFunc) => {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error;
      setDataFunc(data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPharmaceuticalSupplies = () => {
    fetchData('PHARMACEUTICAL_SUPPLIES', setPharmaceuticalSupplies);
  };

  const fetchSurgicalAndNonSurgicalSupplies = () => {
    fetchData('SURGICAL_AND_NON_SURGICAL_SUPPLIES', setSurgicalAndNonSurgicalSupplies);
  };

  const fetchSuppliers = () => {
    fetchData('SUPPLIERS', setSuppliers);
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    console.log('Searching for:', searchQuery);
  };

  const handleEditClick = (content) => {
    console.log(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    console.log('Saving changes...');
    handleCloseDialog();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderTable = () => {
    switch (selectedCategory) {
      case 'Surgical and Non-Surgical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Number</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surgicalAndNonSurgicalSupplies.map((item) => (
                <TableRow key={item.itemNumber}>
                  <TableCell>{item.itemNumber}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.itemDescription}</TableCell>
                  <TableCell>{item.quantityInStock}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{item.costPerUnit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Pharmaceutical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Drug Number</TableCell>
                <TableCell>Drug Name</TableCell>
                <TableCell>Drug Description</TableCell>
                <TableCell>Drug Dosage</TableCell>
                <TableCell>Method of Administration</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pharmaceuticalSupplies.map((drug) => (
                <TableRow key={drug.drugNumber}>
                  <TableCell>{drug.drugNumber}</TableCell>
                  <TableCell>{drug.drugName}</TableCell>
                  <TableCell>{drug.drugDescription}</TableCell>
                  <TableCell>{drug.drugDosage}</TableCell>
                  <TableCell>{drug.methodOfAdmin}</TableCell>
                  <TableCell>{drug.quantityInStock}</TableCell>
                  <TableCell>{drug.reorderLevel}</TableCell>
                  <TableCell>{drug.costPerUnit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Suppliers':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier Number</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Supplier Address</TableCell>
                <TableCell>Telephone Number</TableCell>
                <TableCell>Fax Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.supplierNumber}>
                  <TableCell>{supplier.supplierNumber}</TableCell>
                  <TableCell>{supplier.supplierName}</TableCell>
                  <TableCell>{supplier.supplierAddress}</TableCell>
                  <TableCell>{supplier.telephoneNumber}</TableCell>
                  <TableCell>{supplier.faxNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return <Typography>Please select a category to view the table.</Typography>;
    }
  };

  return (
    <Container maxWidth="false">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MedicalServicesIcon />}
            onClick={() => handleCategoryClick('Surgical and Non-Surgical')}
          >
            Surgical and Non-Surgical
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LocalPharmacyIcon />}
            onClick={() => handleCategoryClick('Pharmaceutical')}
          >
            Pharmaceutical
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            startIcon={<BusinessIcon />}
            onClick={() => handleCategoryClick('Suppliers')}
          >
            Suppliers
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
          <Box style={{ marginBottom: '16px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Available Stocks and Supplies</Typography>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ borderRadius: 1, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                },
              }}
              onChange={handleSearch}
            />
          </Box>
          <Divider />
          {renderTable()}
        </Paper>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={() => handleEditClick('Add Stocks')}>
          Add Stocks
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Staff Assignment</DialogTitle>
        <DialogContent>
          {/* Add form fields or content for editing */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
