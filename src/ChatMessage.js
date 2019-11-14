import React, {Component} from 'react';

export default class ChatMessage extends Component {

    render() {
        let className = "chat-message mb-3 bg-gradient-secondary shadow-sm w-75 rounded p-3 ";
        if(this.props.userId === this.props.message.userId) {
            className += "offset-3 bg-gradient-dark";
        }
        return (
            <div className={className}>
                <strong className='d-block'>{this.props.message.name}</strong>
                <small className='d-block'>{this.props.message.date}</small>
                <span className='d-block'>{this.props.message.message}</span>
            </div>
        );
    }
}
