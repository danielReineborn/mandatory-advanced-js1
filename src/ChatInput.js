/* import React from 'react';
import './App.css';


class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {

        e.preventDefault();
        this.props.socket.emit("message", {
            username: this.props.username,
            content: this.state.value,
        }, function () {

        })

        this.setState({ value: "", })
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    componentDidMount() {
        let socket = this.props.socket;
        socket.on('connect', function () {
            console.log("connected!");
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" value={this.state.value} />
            </form>
        )
    }
}


export default ChatInput; */