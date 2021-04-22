import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import axios from 'axios';
import { connect } from 'react-redux';
import {readTicket} from '../../redux/reducers/ticketReducer';
import {useHistory} from 'react-router-dom';
import Comment from './Comment';
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
        axios.get(`/user/ticket/${props.ticketId}`)
            .then(res =>{
                setTicket(res.data)
                console.log(res.data)
            })
    }, [])

    const closeView = () => {
        setView(false)
    }
    const goBack = () => {
        history.push('/user/dash')
    }

    return (
        <div className='background' >
        { view ?
            <div>
            <div className='ticketContain'>
                <h1 className='ticketData' >{ticket.date}</h1>
                <h1 className='ticketData' >{ticket.title}</h1>
                <h1 className='ticketData' >{ticket.category}</h1>
                <h1 className='ticketData' >{ticket.description}</h1>
                <h1 className='ticketData' >{ticket.media}</h1>
                <Comment />
            </div>
                <span className='closeTicket' onClick={desktop ? closeView : goBack} >&#8678;</span>
            </div>
        : null }
            <div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

// export default Ticket;
export default connect(mapStateToProps, readTicket)(Ticket);