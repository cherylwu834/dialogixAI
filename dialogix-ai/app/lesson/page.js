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

    const renderButton = () => {
        if (status === 'connected')
            return (
                <button
                    disabled={['connecting', 'error'].includes(status)}
                    onClick={stop}
                    className="rounded bg-[#00A651] px-4 py-2 text-white duration-300 ease-in-out hover:bg-[#33B864]"
                >
                    Stop talking
                </button>
            )
        return (
            <button
                disabled={['connecting', 'error'].includes(status)}
                onClick={status === 'connected' ? stop : start}
                className="rounded bg-blue px-4 py-2 text-white duration-300 ease-in-out hover:bg-[#2A61BB]"
            >
                Start talking
            </button>
        )
    }

    return (
        <div className="h-screen">
            <div className="flex h-full flex-col items-center justify-center">
                <div>{renderButton()}</div>
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
                        className="mt-4 block w-full rounded-md border border-gray-300 bg-white p-2 text-blue shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue"
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
                        className="mt-4 block w-full rounded-md border border-gray-300 bg-white p-2 text-blue shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue"
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
        </div>
    )
}
