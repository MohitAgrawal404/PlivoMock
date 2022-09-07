import React from 'react'
import {ConversationBar} from './ConversationBar'
import {MessageView} from './MessageView'
import './FullView.css'

export const FullView = (() => {

    return (
        <div className = "imessage">
            <ConversationBar />
            <MessageView />
        </div>
    )
})