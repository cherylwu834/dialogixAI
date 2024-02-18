// components/ChatBox.js
const ChatBox = ({ messages, onSendMessage }) => {
    return (
        <div className="flex h-screen flex-col border-l">
            <div className="flex-none border-b bg-gray-100 p-4">
                {/* Header Content */}
                <div className="flex items-center">
                    <span className="text-md ml-2 font-semibold">Transcription</span>
                </div>
            </div>
            <div className="flex-grow overflow-auto p-4">
                {/* Messages List */}
                <ul>
                    {messages.map((message, index) => (
                        <li key={index} className={`mb-2 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block rounded-lg px-4 py-2 ${message.isOwn ? 'bg-blue text-white' : 'bg-gray-300'}`}>
                                {message.text}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-none bg-gray-100 p-4">
                {/* Input Field */}
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        const message = event.target.elements.message.value
                        onSendMessage(message)
                        event.target.elements.message.value = ''
                    }}
                    className="flex"
                >
                    <input
                        type="text"
                        name="message"
                        placeholder="Type your message..."
                        className="flex-grow rounded-l border p-2 focus:outline-none"
                    />
                    <button type="submit" className="bg-blue hover:bg-hover-blue rounded-r-lg px-4 py-2 text-white focus:outline-none">
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox
