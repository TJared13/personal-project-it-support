import React, {useState, useEffect} from 'react';
// import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AdminTickets from './ticket/AdminTickets';
import Tickets from './ticket/Ticket';
import '../stylesheets/dash.css';
import NewTicket from './ticket/NewTicket';

const AdminDash = (props) => {
    const [ticket, setTicket] = useState();
    const [createTicket, setCreateTicket] = useState(false);

    // useEffect(() => {
    //     axios.post('/user/dash')
    //         .then(res => {
    //             setTickets(res.data.results)
    //         })
    // }, [])

    const logout = () => {
        axios.get('/auth/logout')
            .then(res => this.props.logout())
    };

    const readTicket = () => {
        axios.get(`/user/api/ticket/${props.match.params.id}`)
        .then(res => {
            setTicket(res.data);
            return (
                <div>
                {ticket}
                </div>
            );
        })
    };

    const _onButtonClick = () => {
        setCreateTicket(true)
    };

    return (
        <div className='mainContain' > 
            <div className='dashContain' >
                <div className='header' >                    
                    <h1>WELCOME Admin!</h1>
                    <Link to='/' onClick={() => logout} className='logout' >Logout</Link>
                </div>
                <div className='userTickets' >
                    <AdminTickets />         
                </div>
                <button onClick={_onButtonClick} className='newTicket'>&#9547;</button>
                    {createTicket ?
                    <NewTicket /> :
                    null}
            </div>   
        </div>
    )

}; 

export default AdminDash;