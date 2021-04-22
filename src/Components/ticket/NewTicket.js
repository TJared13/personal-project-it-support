import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {createTicket} from '../../redux/reducers/ticketReducer';
import axios from 'axios';
import '../../stylesheets/newTicket.css';


const NewTicket = (props) => {
    const [data, setData] = useState({
        id: null,
        date: null,
        title: '',
        category: '',
        description: '',
        media: null
    })
    const history = useHistory();
    const desktop = useMediaQuery({minWidth: 992})
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

    const onButtonClick = () => {
        setView(!view)
    };

    const backMobile = () => {
        history.push('/user/dash')
    }

    return (
        <div>

        {            
            view ?

            <form className='createTicket'>
            <h1 className='newHeader'>Create New Ticket</h1>
            <button type='button' className='backBtn'  className='backBtn' onClick={desktop ? onButtonClick : backMobile} >&#8678;</button>
                <input className='newTitle' type='text' placeholder='Title' onChange={onChange} name='title' value ={data.title} />
                <select className='select' name='category' onChange={onChange} selected>
                    <option  value='' disabled selected>Please select and option </option>
                    <option name='general' value='general' >General Question</option>
                    <option name='internet' value='internet'>Internet Issue</option>
                    <option name='website' value='website'>Website debugging</option>
                    <option name='suggestion' value='suggestion'>Suggestion</option>
                    <option name='other' value='other'>Other Issue</option>
                </select>
                <textarea className='textInput' type='text' placeholder='description' onChange={onChange} name='description' value ={data.description} />
                <button className='submitTicket' type='submit' onClick={(e) => submitTicket(e)} >Submit Request</button>
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