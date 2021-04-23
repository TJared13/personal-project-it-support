import React, {useState, useEffect} from 'react';
import {updateUser, getUser} from '../../redux/reducers/userReducer';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import '../../stylesheets/updateUser.css';

const UpdateProfile = (props) => {
    const history = useHistory();
    const [data, setData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        birthday: null,
        email: '',
        phone_number: ''
    })

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setData(res.data)
                props.getUser(res.data.user_id)
                console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    function updateUser(e){
        e.preventDefault();
        const data1 = { first_name: data.first_name, last_name: data.last_name, birthday: data.birthday, email: data.email, phone_number: data.phone_number, username: data.username}
        console.log(data1)

        axios.put('/user/profile', data1)
            .then (res => {
                props.updateUser({username: res.data.username, id: res.data.user_id})
                history.push('/user/dash')
            })
            .catch(err => console.log(err))
    }

    function onChange(e){
        setData({...data, [e.target.name]: e.target.value})
    }


    return (
        <div className='updateUser' >
            <button className='backBn' onClick={() => history.push('/user/dash')} >&#8678;</button>
            <form className='form' >
                <input type='text' placeholder='First name' name='first_name' onChange={onChange} value={data.first_name}/>
                <input type='text' placeholder='Last name' name='last_name' onChange={onChange} value={data.last_name} />
                <input type='date' placeholder='Birthday' name='birthday' onChange={e => setData({...data, [e.target.name]: e.target.value})}value={data.birthday} />
                <input type='email' placeholder='Email address' name='email' onChange={onChange} value={data.email} />
                <input type='tel' placeholder='Telephone number'  name='phone_number' onChange={onChange} value={data.phone_number} />
                <input type='text' placeholder='Username' name='username' onChange={onChange} value={data.username} />
                <button className="updateUserBtn" type='submit' onClick={(e) => updateUser(e)}>Submit</button>
            </form>
        </div>
    )
};

function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps, {updateUser, getUser})(UpdateProfile);  

// export default Register;  