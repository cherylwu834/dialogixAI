'use client'

import { useState } from 'react'

const questions = [
    {
        id: 1,
        type: 'dropdown',
        question: 'Which language would you like this lesson to be conducted in?',
        options: ['English', 'Chinese', 'French'],
    },
    {
        id: 2,
        type: 'checkbox',
        question: 'Which topic would you like to talk about?',
        options: ['Technology', 'Art', 'Science', 'Food'],
    },
]

export default function Form() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})
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
        setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
    }

    const handleAnswerChange = (event) => {
        const { name, value, checked, type } = event.target
        const isCheckbox = type === 'checkbox'
        const answerValue = isCheckbox ? checked : value

        setAnswers((prev) => ({
            ...prev,
            [name]: isCheckbox ? { ...prev[name], [value]: answerValue } : answerValue,
        }))
        console.log(event.target)
        console.log(answers)
    }

    const renderQuestionInput = (question) => {
        switch (question.type) {
            case 'dropdown':
                return (
                    <select
                        name={String(question.id)}
                        onChange={handleAnswerChange}
                        className="focus:[#0063E2] mt-4 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2"
                        defaultValue=""
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
                    <div key={option} className="mt-2 flex items-center">
                        <input
                            type="checkbox"
                            id={`${question.id}-${option}`}
                            name={String(question.id)}
                            value={option}
                            onChange={handleAnswerChange}
                            className="h-4 w-4 rounded border-gray-300 text-[#0063E2] focus:ring-[#0063E2]"
                        />
                        <label htmlFor={`${question.id}-${option}`} className="ml-2 block text-sm text-gray-900">
                            {option}
                        </label>
                    </div>
                ))
            default:
                return null
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <div className={`w-full max-w-xl rounded-lg bg-white p-6 shadow-md ${transitionState}`} style={{ animationDuration: '0.3s' }}>
                <div className={`question text-2xl font-bold text-black`}>{questions[currentQuestionIndex].question}</div>
                <form className="mt-4">
                    {renderQuestionInput(questions[currentQuestionIndex])}
                    <div className="mt-6 flex justify-between">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="rounded bg-[#0063E2] px-4 py-2 text-white hover:bg-[#337BFF] disabled:opacity-50"
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
