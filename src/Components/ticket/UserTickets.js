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
    const desktop = useMediaQuery({minWidth: 992})
    const [readTicket, setReadTicket] = useState(null)

    useEffect((props) => {
        axios.get('/user/dash')
            .then(res => {
                setTickets(res.data)
                // console.log(res.data)
            })
    }, [])


    const onButtonClick = (ticketId) => {
       setReadTicket(ticketId)  
       desktop ? setReadTicket(ticketId) : history.push(`/user/ticket/${ticketId}`)  
    }
    
    return (
        <div className='sideBarTix'>
            {
                tickets.map(t => { 
                        return ( 
                            <div>
                                <div>
                                <div className='ticketList'>                              
                                   <h2 onClick={() => onButtonClick(t.ticket_id)} className='ticketItems'>Ticket: {t.title}</h2>                                                            
                                </div>
                                <div className='openTicket'>
                                {readTicket === t.ticket_id ? <Ticket  ticketId={t.ticket_id} /> : null}
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