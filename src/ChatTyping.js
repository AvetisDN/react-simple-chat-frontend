import React, {Component} from 'react';

export default class ChatTyping extends Component {

    render() {

        return (
            <div id='chat-typing' className="text-right">
                {this.props.typing === '' &&
                    <i>Silence is gold...</i>
                }
                {this.props.typing !== '' &&
                    <i>{this.props.typing}</i>
                }
            </div>
        );
    }
}
