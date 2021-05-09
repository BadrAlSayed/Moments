import { Container, AppBar, Typography, Grow, Grid, Box, Divider, Toolbar, Button} from '@material-ui/core';
import Styles from '../../styles';
import logo from '../../images/logo.png'
import logo2 from '../../images/image2.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const user = null;
    const styles = Styles();

    return (
        <Box >

        <AppBar className={styles.appBar} position="static" color="inherit" >
        <img className={styles.image} src={logo2}  height="100" width="100" />
        <Box pr={70} pl={5}>
          <Typography component={Link} to='/'  className={styles.heading} variant="h2" align="center">Moments</Typography>
        </Box>
          <Toolbar>
            {user?
            (
            <div className={styles.profile}>
              <Typography className={styles.userName} >{user.result.name}</Typography>
              <Button variant='contained' className={styles.logout} color='secondary' >Logout</Button>
            </div>
            )
            :
                <Button component={Link} to='/auth' variant='contained' color='primary' >Sign up</Button>
            }
            
          </Toolbar>
      </AppBar>
      </Box>
    )
}

export default Navbar
