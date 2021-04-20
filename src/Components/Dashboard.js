import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import UserTickets from './ticket/UserTickets';
import userIcon from '../images/user_icon.png';
import {getUser} from '../redux/reducers/userReducer';
import '../stylesheets/dash.css';
import '../stylesheets/userDropdown.css';
import NewTicket from './ticket/NewTicket';

const Dashboard = (props) => {
    // const [ticket, setTicket] = useState();
    const [createTicket, setCreateTicket] = useState(false);
    const [viewOptions, setViewOptions] = useState(false);
    const [user, setUser] = useState();  

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUser(res.data)
                props.getUser(res.data.user_id)
                console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios.get('/auth/logout')
            .then(res => this.props.logout())
    };

    const _onButtonClick = () => {
        setCreateTicket(true)
    };
    

    
    return (
        <div className='mainContain' > 
            <div className='dashContain' >
                <div className='header' id='img' >                    
                    <h1>WELCOME {user.username}!</h1>
                    <img src={userIcon} alt='user icon' className='userOptions' onClick={() => setViewOptions(!viewOptions)}/>                      
                    { viewOptions ?
                    <div className='optionContain'>                        
                        <Link to ='/user/profile' className='optionButton'>Profile </Link>
                        <Link to='/' onClick={() => logout} className='optionButton' >Logout</Link>
                    </div>
                    
                    : null 
                    }
                </div>
                <div className='userTickets' >
                    <UserTickets />         
                </div>
                <button onClick={_onButtonClick} className='newTicket'>&#9547;</button>
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