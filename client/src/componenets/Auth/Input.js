import {Typography, Grid, TextField } from '@material-ui/core';

const Input = ( name, label, autoFocus, handleChange, type) => {
    return (
        <Grid item xs={12} sm={12} >
            <TextField name={name} label={label} type={type} variant="outlined" fullWidth required onChange={handleChange} autoFocus={autoFocus}/>
            
        </Grid>
    )
}

export default Input
