import React from 'react'
import { Button } from "semantic-ui-react";

function ChatButton () {
    return (
        <div style={{position: 'fixed',
            bottom: '10px',
            right: '10px',
            }}
            data-testid="chat-button" >
            <Button circular size="huge" color='black' icon='chat' />
        </div>
    )
}

export default ChatButton;
