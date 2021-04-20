import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import {createComment, getUserComments} from '../../redux/reducers/commentReducer';
import '../../stylesheets/comment.css';
import axios from 'axios';

const socket = io.connect('http://localhost:3132');

function Comment(props) {
    const [data, setData] = useState({username: '', message: '',})
    const [user, setUser] = useState()
    const [comment, setComment] = useState([])

    useEffect(() => {
      axios.get('/auth/session')
          .then((res) => {
              setUser(res.data)
              props.getUser(res.data.user_id)
              // console.log(res.data.user_id)
          })
          .catch(err => console.log(err))
  }, [])

    useEffect(() => {
      axios.get('/user/ticket/comments')
        .then((res) => {
          setComment(res.data)
          props.getUserComments(res.data.comment_id)
          console.log(res.data.comment_id)
        })
    }, [])

    useEffect(() => {
        socket.on('message', ({username, message}) => {
            setComment([...comment, {username, message} ])
        })
    })

    const onTextChange = e => {
        console.log(e.target.name, e.target.value, data)
        setData({...data, [e.target.name]: e.target.value})
        
      }

    const onMessageSubmit = (e) => {
    e.preventDefault()
    const {username, message} = data;
    console.log(message)
    axios.post('/user/ticket/comments/new', {message})
      .then(res => {
        socket.emit('message', {username, message})
        props.createComment(res.data)
      })
    
    setData({message:'', username:''})
  }
  
    // console.log(comment)
    const renderChat = () => {
        return comment.map(({message}, index) =>(
          <div key={index} className='messages'>
            <h3>{user.username}: <span>{message}</span></h3>
          </div>
        ))
      }

    return (
        <div className='card' >
            {/* <h1>Messenger</h1> */}
        <form onSubmit={onMessageSubmit} className='commentForm'>
            <div className='name-field'>
            {/* <span name='name' onChange={e => onTextChange(e)} value={() => props.getUser()} label="Name">{user?.username}</span> */}
            </div>
            <div>
            <textarea name='message' onChange={e => onTextChange(e)} value={data.message} label="Message" id="outlined-multiline-static" variant='outlined' />
            </div>
            <button className='submit'>Send Message</button>
        </form>
        <div className='render-chat'>
            <h1 className='chatTitle'>Chat Log</h1>
            {renderChat()}
        </div>

        </div>
    )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {getUser, createComment, getUserComments})(Comment);
