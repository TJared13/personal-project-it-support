import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import userIcon from '../images/user_icon.png';
import {getUser} from '../redux/reducers/userReducer';
import {connect} from 'react-redux';
import '../stylesheets/header.css';
import '../stylesheets/userDropdown.css';

function Header() {
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

    
    return (
            <div className='header' >                    
                <h1>WELCOME {user?.username}!</h1>
                <img src={userIcon} alt='user icon' className='userOptions' onClick={() => setViewOptions(!viewOptions)}/>                      
                { viewOptions ?
                <div className='optionContain'>                        
                    <Link to ='/user/profile' className='optionButton'>Profile </Link>
                    <Link to='/' onClick={() => logout} className='optionButton' >Logout</Link>
                </div>
                
                : null 
                }
            </div>
    )
}

export default connect(null, {getUser})(Header);
