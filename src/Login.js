import React from 'react';
import './App.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            count: 0,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onSubmit(e) {
        e.preventDefault();
        let userName = this.state.value;
        this.setState({
            value: "",

        });
        this.props.onLogin(userName, true);
    }
    onChange(e) {
        let wordCount = this.state.value.split("");
        this.setState({
            value: e.target.value,
            count: wordCount.length,
        })
    }


    render() {
        let chars = this.state.value.split("");
        let charCount = chars.length;
        let notValid = /[äöåÄÖÅ]/;
        let validInfo = null;
        if (notValid.test(this.state.value)) {
            validInfo = <p className="words">"ÅÄÖ" is not valid.</p>
        } else if (/^\s+$/g.test(this.state.value)) {
            validInfo = <p className="words">Use some letter(s) along with your spaces.</p>
        }

        return (
            <div className="loginScreen">
                <h1 className="title-login">Web-Chat</h1>
                <h3 className="words">Choose a username to log in.</h3>
                <form className="form-login" onSubmit={this.onSubmit} action="">
                    <input required pattern="[a-zA-Z0-9\s_-]{1,12}" value={this.state.value} maxLength="12" onChange={this.onChange} type="text" name="" id="login" />
                    <input className="btn-std btn-login" type="submit" value="Login" />
                </form>
                <p className="count">{charCount}/12</p>
                {validInfo}
                <p className="foot-info">-powered by Socket.io</p>
            </div >
        )
    }
}

export default Login;