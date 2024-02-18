'use client'

import { useState, useEffect } from 'react'
import ChatBox from './chatbox'
import { useConversation } from 'vocode'

export default function Lesson() {
    useEffect(() => {
        ;(async () => {
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            let devices = await navigator.mediaDevices.enumerateDevices()
            console.log(devices)
        })()
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                console.log('devices', devices)
                setInputDevices(devices.filter((device) => device.deviceId && device.kind === 'audioinput'))
                setOutputDevices(devices.filter((device) => device.deviceId && device.kind === 'audiooutput'))
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const [audioDeviceConfig, setAudioDeviceConfig] = useState({})
    const [inputDevices, setInputDevices] = useState([])
    const [outputDevices, setOutputDevices] = useState([])
    const { status, start, stop, analyserNode, transcripts } = useConversation({
        backendUrl: 'ws://localhost:8086/conversation',
        subscribeTranscript: false,
        audioDeviceConfig,
    })
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
            <div className="flex-1">
                Avatar
                <div>
                    <button disabled={['connecting', 'error'].includes(status)} onClick={status === 'connected' ? stop : start}>
                        Start talking
                    </button>
                </div>
                {inputDevices.length != -1 && (
                    <select
                        name="input speaker"
                        onChange={(event) =>
                            setAudioDeviceConfig({
                                ...audioDeviceConfig,
                                inputDeviceId: event.target.value,
                            })
                        }
                        value={audioDeviceConfig.inputDeviceId}
                    >
                        {inputDevices.map((device, i) => {
                            return (
                                <option key={i} value={device.deviceId}>
                                    {device.label}
                                </option>
                            )
                        })}
                    </select>
                )}
                {
                    <select
                        name="output speaker"
                        onChange={(event) =>
                            setAudioDeviceConfig({
                                ...audioDeviceConfig,
                                outputDeviceId: event.target.value,
                            })
                        }
                        value={audioDeviceConfig.outputDeviceId}
                    >
                        {outputDevices.map((device, i) => {
                            return (
                                <option key={i} value={device.deviceId}>
                                    {device.label}
                                </option>
                            )
                        })}
                    </select>
                }
                {transcripts.length > 0 &&
                    transcripts.map((item, index) => {
                        return (
                            <div key={'t' + index.toString()} color="white">
                                {item.sender}: {item.text}
                            </div>
                        )
                    })}
            </div>
            <div className="container mx-auto flex-1">
                <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </div>
        </div>
    )
}
