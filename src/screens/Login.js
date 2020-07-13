import React, { Component } from 'react';
import { resetErrorMessage, checkUser } from '../actions/login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import '../App.css';
import loader from '../assets/loader.gif'

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userName: '',
            password: ''
        };
    }
    
    componentDidUpdate(){
        if (this.props.isError){
            alert(`Error: ${this.props.errorMessage}`);
            this.props.dispatch(resetErrorMessage());
        }
    }
    
    login() {
        console.log('sfsgg');
        if (this.state.userName === '' || this.state.password === '') {
            alert('User Name or Password is empty. Please fill the Detail.');
        }else{
            this.props.dispatch(checkUser(this.state));
        }
    }

    render() {
        console.log(this.props);
        if (this.props.isLogin) {
            localStorage.setItem('isLogin', true);
            localStorage.setItem('userName', this.props.userName);
            return <Redirect to = '/product' / > ;
        }
        return ( 
            <div className="login">
                <div className="loginScreen">
                    <h1 className="sCartHeading">sCart</h1>
                    <div className="innerBox">
                       <input type="text" placeholder="Username" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value})}/>
                    </div>
                    <div className="innerBox"> 
                        <input type = "password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})}/>
                    </div>
                    <div className="innerBox loginButton"><button onClick={()=>this.login()}>Login {this.props.isLoading && <img className="imageStyle" src={loader} alt="Logo" />}</button></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.login.isLogin,
    isLoading: state.login.isLoading,
    userName: state.login.userName,
    errorMessage: state.login.errorMessage,
    isError: state.login.isError,
});

export default connect(mapStateToProps)(Login);