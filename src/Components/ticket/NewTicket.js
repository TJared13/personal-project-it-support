import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createTicket} from '../../redux/reducers/ticketReducer';
import axios from 'axios';


const NewTicket = (props) => {
    const [data, setData] = useState({
        id: null,
        date: null,
        title: '',
        category: '',
        description: '',
        media: null
    })
    
    const [view, setView] = useState(true)
    

    const submitTicket = (e) => {
        e.preventDefault();
        console.log(props)
        const {id} = props;
        const data1 = {id: id, date: data.date, title: data.title, category: data.category, description: data.description, media: data.media};
        axios.post('/user/ticket/new', data1)
            .then(res => {

                props.createTicket({date: res.data.date, title: res.data.title, category: res.data.category, description: res.data.description, media: res.data.media})
                setView(false)
                alert('Post successfully submitted')
            })
            .catch(err => console.log(err))
    }
    
    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const _onButtonClick = () => {
        setView(false)
    };

    return (
        <div>

        {            
            view ?

            <form className='createTicket'>
            <button to='/user/dash'  className='back' onClick={_onButtonClick} >&#8678;</button>
                <input type='text' placeholder='Title' onChange={onChange} name='title' value ={data.title} />
                <select name='category' onChange={onChange} selected>
                    <option name='general' value='general' >General Question</option>
                    <option name='internet' value='internet'>Internet Issue</option>
                    <option name='website' value='website'>Website debugging</option>
                    <option name='suggestion' value='suggestion'>Suggestion</option>
                    <option name='other' value='other'>Other Issue</option>
                </select>
                <textarea type='text' placeholder='description' onChange={onChange} name='description' value ={data.description} />
                <input type='file' placeholder='upload relevant image' onChange={onChange} name='media' value ={data.media} />
                <button type='submit' onClick={(e) => submitTicket(e)} >Submit Request</button>
            </form>

            : null
}        
</div>
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {createTicket})(NewTicket);