'use client'

import { useState } from 'react'
import ChatBox from './chatbox'

export default function Lesson() {
    const [messages, setMessages] = useState([
        { text: 'Hi there!', isOwn: false },
        { text: 'Hi there! My name is Bryan', isOwn: true },
        // Add more initial messages if needed
    ])

    const handleSendMessage = (newMessage) => {
        setMessages([...messages, { text: newMessage, isOwn: true }])
    }

    return (
        <div className="flex">
            <div className="flex-1">AVATAR</div>
            <div className="container mx-auto flex-1">
                <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </div>
        </div>
    )
}
