'use client'

import { useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const questions = [
    {
        id: 1,
        type: 'dropdown',
        question: 'Which language would you like this lesson to be conducted in?*',
        options: ['English', 'Chinese', 'French'],
    },
    {
        id: 2,
        type: 'checkbox',
        question: 'Which topic would you like to talk about?*',
        options: ['Technology', 'Art', 'Science', 'Food'],
    },
]

export default function Form() {
    const router = useRouter()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [language, setLanguage] = useState('English')
    const [topic, setTopic] = useState('')
    const [transitionState, setTransitionState] = useState('slideIn')

    const handleNext = () => {
        setTransitionState('slideOut')
        // Wait for the animation to complete before changing the question.
        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setTransitionState('slideIn')
        }, 300) // This should match the animation-duration.
    }

    const handlePrevious = () => {
        setTransitionState('slideOut')
        // Wait for the animation to complete before changing the question.
        setTimeout(() => {
            setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
            setTransitionState('slideIn')
        }, 300) // This should match the animation-duration.
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const handleTopicChange = (event) => {
        if (topic === event.target.value) {
            setTopic('')
            return
        }
        setTopic(event.target.value)
    }

    const handleSubmit = () => {
        router.push(`/lesson?language=${language.toLocaleLowerCase()}&topic=${topic.toLocaleLowerCase()}`)
    }

    const isInputEmpty = (input) => {
        return input == ''
    }

    const renderQuestionInput = (question) => {
        switch (question.type) {
            case 'dropdown':
                return (
                    <select
                        name={String(question.id)}
                        onChange={handleLanguageChange}
                        className="focus:ring-blue text-blue mt-4 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2"
                        value={language}
                    >
                        <option disabled>Select your option</option>
                        {question.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )
            case 'checkbox':
                return question.options.map((option) => (
                    <div
                        key={option}
                        className="border-blue mt-2 flex w-[190px] items-center rounded-md border border-solid bg-[#E7ECF7] p-2 hover:bg-[#B7C6E8] active:border-[#0445AF]"
                    >
                        <input
                            type="radio"
                            id={`${question.id}-${option}`}
                            name={String(question.id)}
                            value={option}
                            onChange={handleTopicChange}
                            className="text-blue focus:ring-blue h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`${question.id}-${option}`} className="ml-2 block text-sm text-gray-900">
                            {option}
                        </label>
                        {/* {topic === option && <FaCheck className="ml-auto" color="#0445AF" />} */}
                    </div>
                ))
            default:
                return null
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
            <div className={`mt-auto w-full rounded-lg bg-white p-6 ${transitionState}`} style={{ animationDuration: '0.3s' }}>
                <div className="w-fit">
                    <div className={'question pb-4 text-2xl font-normal text-black'}>{questions[currentQuestionIndex].question}</div>
                    <form className="mb-8 mt-4">{renderQuestionInput(questions[currentQuestionIndex])}</form>
                    {currentQuestionIndex === questions.length - 1 && !isInputEmpty(topic) && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue rounded px-4 py-2 duration-300 ease-in-out hover:bg-[#2A61BB]"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-auto flex justify-end">
                <div className="bg-blue mb-4 rounded">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="rounded-l border-r border-gray-200 px-4 py-2 duration-300 ease-in-out hover:bg-[#2A61BB]"
                        disabled={currentQuestionIndex === 0}
                    >
                        <IoChevronBack className="text-white " />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="rounded-r px-4 py-2 duration-300 ease-in-out hover:bg-[#2A61BB]"
                        disabled={currentQuestionIndex === questions.length - 1}
                    >
                        <IoChevronForward />
                    </button>
                </div>
            </div>
        </div>
    )
}
