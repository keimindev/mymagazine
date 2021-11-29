import {Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../redux/configStore'
import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Register from '../pages/Register';
import PostWrite from '../pages/PostWrite';
import Header from './Header';
import {Grid} from '../elements'

function App() {
  return (
    <>
    <Grid>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={ PostList}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/write' exact component={PostWrite}/>
        <Route path='/:id/edit' exact component={PostWrite}/>
        </ConnectedRouter>
    </Grid>
    </>

  );
}

export default App;
