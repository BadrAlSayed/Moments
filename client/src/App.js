import { Container, AppBar, Typography, Grow, Grid, Box, Divider} from '@material-ui/core';
import Styles from './styles';
import Navbar from './componenets/Navbar/Navbar';
import Home from './componenets/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './componenets/Auth/Auth';

// const fetchPost = async () => {
//   const res = await axios.get('http://localhost:5000/posts')
//    const posts = await res.data;
//    return posts;
   
// }

const App = () => {
  
  
  return (
      <div id="root">
        <BrowserRouter>
        <Container maxWidth="lg" >
      <Navbar />
      <Grow in>
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth}  />
          </Switch>
        </Container>
      </Grow>
    </Container>
        </BrowserRouter>
    
    </div>
  );
}

export default App;
