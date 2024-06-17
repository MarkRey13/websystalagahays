import React, { useRef } from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import hospitalImage from '../Images/HospitalImage.png';  
import GroupPic from '../Images/GroupPic.png';    
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/login');
    };

    const signUpPage = () => {
        navigate('/signup');
    };

  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const teamRef = useRef(null);
  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit" onClick={loginPage}>Login</Button>
            <Button color="inherit" onClick={signUpPage}>SignUp</Button>
            <Button color="inherit" onClick={() => handleScroll(aboutUsRef)}>About Us</Button>
            <Button color="inherit" onClick={() => handleScroll(teamRef)}>Team</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Box
          component="img"
          sx={{
            height: 400,
            width: '50%',
            maxWidth: { xs: 300, md: 600 },
          }}
          alt="Hospital Image"
          src={hospitalImage}
        />
      </Box>

      <Container maxWidth="sm" style={{ height: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center">
          Where we can assist your healthcare.
        </Typography>
      </Container>
      <Container ref={aboutUsRef} maxWidth="sm" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom>
          About us:
        </Typography>
        <Typography variant="body1" align="center">
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center">
          Wellmeadows Hospital has been a cornerstone
          of healthcare in our community for over 50 years. 
          Our mission is to provide exceptional medical care with compassion, 
          respect, and a commitment to excellence. We believe in treating 
          every patient as a unique individual, ensuring their physical, 
          emotional, and spiritual needs are met.
        </Typography>
      </Container>
      
      <Container ref={teamRef} maxWidth="sm" style={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Team:
        </Typography>
        <Box
          component="img"
          sx={{
            height: 800,
            width: '1200%',
            maxWidth: { xs: 300, md: 600 },
          }}
          alt="Team Image"
          src={GroupPic}
        />
      </Container>
      
    </>
  );
};

export default Home;