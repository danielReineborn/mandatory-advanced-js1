import React from 'react';
import './App.css';
import ListItem from './ListItem';
import io from 'socket.io-client';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pastMsgs: [],
            messages: [],
            value: "",
            counter: 0,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
        this.scrollBar = React.createRef();
        this.socket = io('http://3.120.96.16:3000');

    }

    renderPastMsg(data) {
        data.map((x) => {
            return <li key={x.id}>{`${x.username}: ${x.content}`}</li>

        })
    }

    scrollBottom() {
        this.scrollBar.current.scrollTo(0, this.scrollBar.current.scrollHeight)
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.socket.emit("message", {
            username: this.props.username,
            content: this.state.value,
        }, function () {
        })
        this.setState((state) => {
            let messages = state.messages.concat({
                content: this.state.value,
                username: this.props.username,
                id: `self ${this.state.counter}`,

            });

            return { messages, }

        })

        this.setState({ value: "", counter: this.state.counter + 1, })
    }

    logOut() {
        this.props.onLogin("", false)
    }

    componentDidMount() {
        this.socket.on('connect', function () {
        })
        this.socket.on("messages", (data) => {

            this.setState({
                pastMsgs: data,
            })

        })
        this.socket.on("new_message", (data) => {
            this.setState((state) => {
                let messages = state.messages.concat({
                    content: data.content,
                    username: data.username,
                    id: data.id
                });
                return { messages, }
            })
        })
    }
    componentWillUnmount() {
        this.socket.off();
    }
    componentDidUpdate() {
        this.scrollBottom();
    }
    render() {
        //count chars in state.value
        let charCount = this.state.value.length;
        return (
            <section className="chatWindow">
                <div className="btn-cont">
                    <button onClick={this.logOut} className="btn-std">Close</button>
                    <h4 className="words">Welcome {this.props.username}!</h4>
                </div>
                <div className="chat" ref={this.scrollBar}>
                    <ul>
                        {this.state.pastMsgs.map((x) => {
                            return <ListItem key={x.id}>{`${x.username}: ${x.content}`}</ListItem>
                        })}
                        {this.state.messages.map((x) => {
                            return <ListItem key={x.id}>{`${x.username}: ${x.content}`}</ListItem>
                        })}
                    </ul>
                </div >
                <div className="input-chat">
                    <form onSubmit={this.onSubmit}>
                        <input required minLength="1" maxLength="200" onChange={this.onChange} type="text" value={this.state.value} />
                    </form>
                    <p className="count">{charCount}/200</p>
                </div>
            </section>
        )
    }
}

export default ChatWindow;