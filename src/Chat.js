import React, {Component} from 'react';
import ChatMessage from './ChatMessage';
import ChatTyping from './ChatTyping';

const URL = 'ws://localhost:3030';

export default class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            name: 'John Doe',
            message: 'Hello',
            messages: [],
            typing: ''
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.showTyping = this.showTyping.bind(this);
        this.hideTyping = this.hideTyping.bind(this);
        this.ws = new WebSocket(URL);
    }

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            this.setState({
                userId: Date.now()
            });
            console.log('connected')
        };

        this.ws.onmessage = (event) => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(event.data);
            if(message.typing === '') {
                this.addMessage(message)
            } else {
                console.log(message);
                this.showTyping(message);
                setTimeout(this.hideTyping, 2000);
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.ws = new WebSocket(URL);
        }
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    submitMessage(event) {
        event.preventDefault();
        let messageString = this.state.message;
        let date = new Date();
        const message = {
            userId: this.state.userId,
            name: this.state.name,
            date: date.toLocaleTimeString(),
            message: messageString
        };
        this.ws.send(JSON.stringify(message));
    };

    onChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }
    onChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
        let message = {
            typing: this.state.name + " is typing..."
        };
        this.ws.send(JSON.stringify(message));
    }

    showTyping(message) {
        this.setState({
            typing: message.typing
        });
    }
    hideTyping() {
        this.setState({
            typing: ''
        });
    }

    render() {
        return (
            <div id='chat-container'>
                <div id='chat-messages' className='py-3 d-flex flex-column'>
                    <div id="chat-messages-container">
                        {this.state.messages.map((message, index) =>
                            <ChatMessage key={index} message={message} userId={this.state.userId}/>
                        )}
                    </div>
                </div>
                <ChatTyping typing={this.state.typing}/>
                <div id='chat-form' className="mt-3">
                    <form id="msg-form" onSubmit={this.submitMessage}>
                        <div className="form-group d-flex align-items-center">
                            <label htmlFor="name" className="col text-right">Name:</label>
                            <input id="name" placeholder="Name" className="form-control col"
                                   value={this.state.name}
                                   onChange={this.onChangeName}/>
                        </div>
                        <div className="form-group d-flex align-items-center">
                            <label htmlFor="msg" className="col-auto">Message:</label>
                            <input id="msg" placeholder="Message" className="form-control col"
                                   value={this.state.message}
                                   onChange={this.onChangeMessage}
                            />
                        </div>
                        <div className="form-group d-flex justify-content-end">
                            <button className="btn btn-dark px-5 text-uppercase" type="submit">send</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
