import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import {useMediaQuery} from 'react-responsive';
import {createComment, getUserComments} from '../../redux/reducers/commentReducer';
import '../../stylesheets/comment.css';
import axios from 'axios';

const socket = io.connect('http://localhost:3132');

function Comment(props) {
    const [data, setData] = useState({username: '', comment: '',})
    const [user, setUser] = useState()
    const [comment, setComment] = useState([])
    const desktop = useMediaQuery({minWidth: 992})

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
      const {ticketId} = props;
      if (ticketId) {
      const id = ticketId;
      axios.get(`/user/ticket/comments/${id}`)
        .then((res) => {
          setComment(res.data)
          props.getUserComments(res.data.comment_id)
          console.log(res.data.comment_id)
        })}
    }, [props.ticketId])

    useEffect(() => {
        socket.on('comment', ({username, comment}) => {
            setComment([...comment, {username, comment} ])
        })
    })

    const onTextChange = e => {
        setData({...data, [e.target.name]: e.target.value})        
      }

    const onMessageSubmit = (e) => {
    e.preventDefault()
    const {username, comment} = data;
    console.log(comment)
    axios.post('/user/ticket/comments/new', {comment})
      .then(res => {
        socket.emit('comment', {username, comment})
        props.createComment(res.data)
      })
    
    setData({comment:'', username:''})
  }
  
    // console.log(comment)
    const renderChat = () => {
        return comment.map(({comment}, index) =>(
          <div key={index} className='messages'>
            <h3>{user.username}: <span>{comment}</span></h3>
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
            <textarea name='comment' onChange={e => onTextChange(e)} value={data.comment} label="comment" id="outlined-multiline-static" variant='outlined' />
            </div>
            <button className='send'>{desktop ? <p>Send comment</p> : <p>Send</p>}</button>
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
