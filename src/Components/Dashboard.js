import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import UserTickets from './ticket/UserTickets';
import {getUser} from '../redux/reducers/userReducer';
import '../stylesheets/dash.css';
import NewTicket from './ticket/NewTicket';
import Header from './Header';

const Dashboard = () => {
    const history = useHistory();
    const desktop = useMediaQuery({minWidth: 992})
    const [createTicket, setCreateTicket] = useState(false);

    const createNew = () => {
        setCreateTicket(true)
    };

    const createNewMobile = () => {
        history.push('/user/ticket/new')
    }

    

    
    return (
        <div className='mainContain' > 
            <div className='dashContain' >
                <Header />
                <div className='userTickets' >
                    <UserTickets />         
                </div>
                <button onClick={desktop ? createNew : createNewMobile} className='newTicket'>&#9547;</button>
                    {createTicket ?
                    <NewTicket /> :
                    null}
            </div>   
        </div>
    )

}; 

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUser})(Dashboard);