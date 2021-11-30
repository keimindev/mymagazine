import {useEffect} from 'react'
import {Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../redux/configStore'
import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Register from '../pages/Register';
import PostWrite from '../pages/PostWrite';
import PostDetail from "../pages/PostDetail";
import Header from './Header';
import {Grid} from '../elements'


import {actionCreators as userActions} from '../redux/modules/user'
import {useDispatch} from 'react-redux'
import { apiKey } from '../firebase'


function App() {
  const dispatch = useDispatch();
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_sessionKey) ? true : false

  useEffect( () => {
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  }, [])

  return (
    <>
    <Grid>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={ PostList}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/write' exact component={PostWrite}/>
        <Route path='/:id/detail' exact component={PostDetail}/>
        </ConnectedRouter>
    </Grid>
    </>

  );
}

export default App;
