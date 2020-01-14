import React from 'react';
import './App.css';
import ListItem from './ListItem';

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
    }

    renderPastMsg(data) {
        data.map((x) => {
            return <li key={x.id}>{`${x.username}: ${x.content}`}</li>

        })
    }

    scrollBottom() {
        let element = document.querySelector(".chat");
        element.scrollTop = element.scrollHeight;
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.socket.emit("message", {
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
        this.props.socket.on('connect', function () {
            console.log("connected!");
        })
        this.props.socket.on("messages", (data) => {
            console.log(data);
            this.setState({
                pastMsgs: data,
            })

        })
        this.props.socket.on("new_message", (data) => {
            console.log(data);
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
        let socket = this.props.socket;
        socket.off();
    }
    componentDidUpdate() {
        this.scrollBottom();
    }
    render() {

        return (
            <section className="chatWindow">

                <div className="chat">
                    <ul>

                        {this.state.pastMsgs.map((x) => {
                            return <ListItem key={x.id}>{`${x.username}: ${x.content}`}</ListItem>
                        })}
                        {this.state.messages.map((x) => {

                            return <ListItem key={x.id}>{`${x.username}: ${x.content}`}</ListItem>
                        })}
                    </ul>
                    <form onSubmit={this.onSubmit}>
                        <input required maxLength="200" onChange={this.onChange} type="textarea" value={this.state.value} />
                    </form>
                </div >
                <div className="btn-cont">

                    <button onClick={this.logOut} className="btn-logout">Logout!</button>
                </div>
            </section>
        )
    }
}

export default ChatWindow;