import {Typography, Paper, Button, Container, Grid, Avatar, TextField, Box } from '@material-ui/core';
import styles from './AuthStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';



const Auth = () => {
    const Styles = styles();
    const initState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
    const [formData,setFormData] = useState(initState);
    const [isSignup,setIsSignUp] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    };
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    };
    const handleSign = () => {
        setIsSignUp(!isSignup);
    }; 
    return (
        <Container component="main" maxWidith="xs" fixed > 
            <Paper className={Styles.paper} elevation={3}>
            <Avatar className={Styles.avatar} >
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup? 'Sign Up': 'Sign In'}</Typography>
            <form onSubmit={handleSubmit} className={Styles.form}>
               <Grid container spacing={2} >
                    {
                        isSignup && (
                            <>
                            
                        <Grid item xs={12} sm={6} spacing={3} >
                          < TextField name="firstName" label="first Name" type="text" variant="outlined" fullWidth required onChange={handleChange} autoFocus  />
                        </Grid>
                        
                        <Grid  item xs={12} sm={6} p={3}>
                        < TextField name="lastName" label="Last Name" type="text" variant="outlined" fullWidth required onChange={handleChange} />
                        </Grid> 
                        </>
                        )
                    }
                        <Grid item sm={12} xs={12} >
                            <TextField name="email" label="Email Address" onChange={handleChange} type="email" variant="outlined" fullWidth required  />
                        </Grid>
                        <Grid item sm={12} xs={12} >
                            <TextField name="password" label="Password" onChange={handleChange} type="password" variant="outlined" fullWidth required  />
                        </Grid>
                        { isSignup && <Grid item sm={12} xs={12} >
                            <TextField name="confirmPassword" label=" Confirm Password" onChange={handleChange} type="password" variant="outlined" fullWidth required  />
                        </Grid>}
                        <Grid item sm={12} xs={12}  >
                            <Button className={Styles.submit}  fullWidth variant="contained" color="primary" type="submit" >{isSignup? 'Sign Up': 'Sign In'}</Button>
                        </Grid>
                        
                </Grid>
                <Grid item >
                    <Button fullWidth   onClick={handleSign} >{isSignup?'Already have an account?': `Don't have an account?`}</Button>
                </Grid>
            </form>
            </Paper>


        </Container>
    )
}

export default Auth
