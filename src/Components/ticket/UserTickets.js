import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import {getUserTickets} from '../../redux/reducers/ticketReducer';
import {connect}  from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import Ticket from './Ticket';
import axios from 'axios';
import  '../../stylesheets/userSidebar.css';

const UserTickets = (props) => {
    const history = useHistory();
    const [tickets, setTickets] = useState([{
        ticketId: null,
        title: '',
        description: ''
    }]);
    const [readTicket, setReadTicket] = useState(null)
    const desktop = useMediaQuery({minWidth: 992})
    const mobile = useMediaQuery({maxWidth: 480})

    useEffect(() => {
        axios.get('/user/dash')
            .then(res => {
                setTickets(res.data)
            })
    }, [])


    const viewTicket = (ticketId) => {   
        setReadTicket(ticketId)
    }

    const openTicket = (ticketId) => {
        history.push(`/user/ticket/${ticketId}`)
    }

    const deleteTicket = (id) => {
        // const {ticketId} = props;
        // const id = ticketId;
        console.log('hello')
         axios.delete(`/user/ticket/delete/${id}`)
         .then(() => {
             alert('Ticket has successfully been deleted')
             history.push('/user/dash')
         })
     }


    
    return (
        <div className='sideBarTix'>
            {
                tickets.map((t, index) => { 
                        return ( 
                            <div key={index} >
                                <div>
                                <div className='ticketList'>                              
                                   <h2 onClick={() => viewTicket(t.ticket_id)} className='ticketItems'>Ticket: {t.title}</h2>                                                            
                                   {/* <h2 onClick={() => desktop ? viewTicket(t.ticket_id) : openTicket(t.ticket_id)} className='ticketItems'>Ticket: {t.title}</h2>                                                             */}
                                   {/* <h2 onClick={() => desktop ? viewTicket(t.ticket_id) : history.push(`/user/ticket/${t.ticket_id}`)} className='ticketItems'>Ticket: {t.title}</h2>                                                             */}
                                </div>
                                <div className='openTicket'>
                                {/* {readTicket === t.ticket_id ? <Ticket  ticketId={t.ticket_id} /> : null} */}

                                {/* {readTicket === t.ticket_id && desktop ? <Ticket  ticketId={t.ticket_id} /> :  readTicket === t.ticket_id && mobile ? openTicket : null} */}

                                {/* {readTicket === t.ticket_id && desktop ? <Ticket  ticketId={t.ticket_id} /> :  readTicket === t.ticket_id && mobile ? <Link to={`/user/ticket/${t.ticket_id}`} /> : null} */}

                                {readTicket === t.ticket_id && desktop ? <Ticket  ticketId={t.ticket_id} deleteTicket={deleteTicket} /> : readTicket === t.ticket_id && mobile ? history.push(`/user/ticket/${t.ticket_id}`) : null}
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUserTickets})(UserTickets);