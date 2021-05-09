import { Grid } from '@material-ui/core';
import { useState } from 'react';
import Posts from './posts/Posts';
import Form from './form/Form';


const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    return (
        <div>
          
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
             <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
             </Grid>
             <Grid item xs={12} sm={4}>
               <Form  currentId={currentId} setCurrentId={setCurrentId} />
             </Grid>
          </Grid>
        </div>
    )
}

export default Home
