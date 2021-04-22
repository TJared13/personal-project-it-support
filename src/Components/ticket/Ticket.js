import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import axios from 'axios';
import { connect } from 'react-redux';
import {readTicket, deleteUserTicket} from '../../redux/reducers/ticketReducer';
import {useHistory} from 'react-router-dom';
import Comment from './Comment';
import trash from '../../images/trash.png';
import '../../stylesheets/Ticket.css';



const Ticket = (props) => {
    const [ticket, setTicket] = useState({
        ticketId: null,
        date: null,
        title: '',
        category: '',
        description: '',
        media: '',
        isOpen: true
    })

    const history = useHistory();
    const desktop = useMediaQuery({minWidth: 992})
    

    const [view, setView] = useState(true)
    // const history = useHistory();

    useEffect(() => {
        if (props.match){
        axios.get(`/user/ticket/${props.match.params.id}`)
            .then(res =>{
                setTicket(res.data)
                // console.log(res.data)
            })} else {
                axios.get(`/user/ticket/${props.ticketId}`)
                .then(res =>{
                    // console.log(res.data)
                    setTicket(res.data)
                })
            }
    }, [])

    const closeView = () => {
        setView(false)
    }
    const goBack = () => {
        history.push('/user/dash')
    }

    // const deleteTicket = (id) => {
    //     // const {ticketId} = props;
    //     // const id = ticketId;
    //     console.log('hello')
    //      axios.delete(`/user/ticket/delete/${id}`)
    //      .then(() => {
    //          alert('Ticket has successfully been deleted')
    //          closeView();
    //          history.push('/user/dash')
    //      })
    //  }

    
    console.log(ticket.ticket_id)
    return (
        <div className='background' >
        { view ?
            <div>
            <div className='ticketContain'>
                <span className='closeTicket' onClick={desktop ? closeView : goBack} >&#8678;</span>
                <img src={trash} alt='trash-icon' className='delete' onClick={() => props.deleteTicket(ticket.ticket_id)}/>
                <h1 className='ticketData' >{ticket.date}</h1>
                <h1 className='ticketData' >{ticket.title}</h1>
                <h1 className='ticketData' >{ticket.category}</h1>
                <h1 className='ticketData' >{ticket.description}</h1>
                {/* <h1 className='ticketData' >{ticket.media}</h1> */}
                <Comment ticketId={ticket.ticket_id} />
            </div>
            </div>
            : null }
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

// export default Ticket;
export default connect(mapStateToProps, {readTicket, deleteUserTicket})(Ticket);