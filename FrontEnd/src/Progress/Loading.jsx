import React from 'react'

function Loading() {
    return (
        <>
            <div
                className="flex justify-center items-center h-screen"
            >
                <div
                    className="animate-spin rounded-full border-4 sm:border-4 md:border-6 lg:border-8 border-solid border-current border-r-transparent text-blue-500"
                    style={{ width: "4rem", height: "4rem" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading
