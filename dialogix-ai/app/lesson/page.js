'use client'

import { useSearchParams } from 'next/navigation'

export default function Lesson() {
    const searchParams = useSearchParams()

    const language = searchParams.get('language')
    const topic = searchParams.get('topic')

    return (
        <main>
            <h1>Lesson</h1>
            <p>Language: {language}</p>
            <p>Topic: {topic}</p>
        </main>
    )
}
