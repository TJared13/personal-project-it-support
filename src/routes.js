import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/user/Auth'
import Register from './Components/user/Register';
import Dashboard from './Components/Dashboard';
import AdminDash from './Components/AdminDash';
import Ticket from './Components/ticket/Ticket';
import UpdateProfile from './Components/user/UpdateProfile';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/auth/register' component={Register} />
        <Route path='/user/dash' component={Dashboard} />
        <Route path ='/admin/dash' component ={AdminDash} />
        <Route path='/user/api/ticket/:id' component={Ticket} />
        <Route path='/user/profile' component={UpdateProfile} />
    </Switch> 
)