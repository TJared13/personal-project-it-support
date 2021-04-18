import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import '../../stylesheets/comment.css';

const socket = io.connect('http://localhost:3132');

function Comment(props) {
    const [state, setState] = useState({username: '', message: '',})
    const [comment, setComment] = useState([])

    useEffect(() => {
        socket.on('message', ({username, message}) => {
            setComment([...comment, {username, message} ])
        })
    })

    const onTextChange = e => {
        setState({...state, [e.target.name]: e.target.value})
      }

    const onMessageSubmit = (e) => {
    e.preventDefault()
    const {username, message} = state;
    socket.emit('message', {username, message})
    setState({message:'', username})
    }

    const renderChat = () => {
        return comment.map(({username, message}, index) =>(
          <div key={index}>
            <h3>{username}: <span>{message}</span></h3>
          </div>
        ))
      }

    return (
        <div>
        <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            <div className='name-field'>
            <TextField name='name' onChange={e => onTextChange(e)} value={state.name} label="Name" />
            </div>
            <div>
            <TextField name='message' onChange={e => onTextChange(e)} value={state.message} label="Message" id="outlined-multiline-static" variant='outlined' />
            </div>
            <button>Send Message</button>
        </form>
        <div className='render-chat'>
            <h1>Chat Log</h1>
            {renderChat()}
        </div>

        </div>
    )
}

export default connect(null, {getUser})(Comment);
