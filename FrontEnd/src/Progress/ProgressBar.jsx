import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function ProgressBar() {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setProgress(0)
        setIsComplete(false)

        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer)
                    setIsComplete(true)
                }
                return prevProgress < 100 ? prevProgress + 1 : 100
            })
        }, 20)

        return () => clearInterval(timer)
    }, [location])

    return (
      <>
        {!isComplete && (
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-blue-500 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        )}
      </>
    )
}

export default ProgressBar
