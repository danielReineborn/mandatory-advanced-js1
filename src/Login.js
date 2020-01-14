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
        console.log(this.state.value, this.state.count)



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
        let words = this.state.value.split("").filter(x => x);
        let wordCount = words.length;

        return (
            <div className="loginScreen">
                <h1 className="title">Choose username to log in.</h1>
                <form onSubmit={this.onSubmit} action="">
                    <input required pattern="[a-zA-Z0-9\s]{1,12}" value={this.state.value} maxLength="12" onChange={this.onChange} type="text" name="" id="login" />
                    <input type="submit" value="Login" />
                </form>
                <p style={{ color: "white" }} className="words">{wordCount}/12</p>

            </div >
        )
    }
}

export default Login;