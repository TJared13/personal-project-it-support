import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateUser} from '../../redux/reducers/userReducer';
import axios from 'axios';
import '../../stylesheets/Auth.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAdmin: null,
            errorMsg: ''
        }
    }

    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    login = (e) => {
        e.preventDefault();
        axios.post('/auth/login', this.state)
            .then(res => {
                // this.props.history.push('/user/dash')
                this.props.updateUser({username: res.data.username, id: res.data.user_id, isAdmin: res.data.is_admin})

                this.props.user.user.isAdmin ? this.props.history.push('/admin/dash') : this.props.history.push('/user/dash') 
                console.log(this.props)
            })
            .catch(err => {
                console.log(err)
                this.setState({errorMsg: 'Incorrect username or password'})
            })
    }

    closeErrorMessage = () => {
        this.setState({
            username: '',
            password: '',
            errorMsg: false
        })
    }

    render(){
        return (
            <div className='loginWrapper' >
                <form>
                    <h1>Welcome!</h1>
                    <img  />
                    <div>
                        <label>Username</label>
                        <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
                        <label>Password</label>
                        <input type='password' value={this.state.password} onChange={e => this.handleChange('password', e.target.value)} />
                    </div>
                    {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
                    <div>
                    <button onClick={(e) => this.login(e)}>Login</button>
                    <Link className='register' to='/auth/register'>Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {return state}

export default connect(mapStateToProps, {updateUser})(Auth);