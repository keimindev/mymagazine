import React from 'react'
import {useSelector} from 'react-redux'
import { apiKey } from '../firebase'


const Permit = (props) => {
    const is_login = useSelector((state) => state.user.is_login);

    const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_sessionKey)

    console.log(is_login, is_session)
    
    if(is_session && is_login){
        console.log('hello')
        return <React.Fragment>{props.children}</React.Fragment>
    }
    
    return null;
}

export default Permit
