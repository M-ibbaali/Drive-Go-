import { useState } from 'react'

function SearchBar() {
    const [pickDrop, setPickDrop] = useState('pick')

    const handleRadioChange = (event) => {
        setPickDrop(event.target.id)
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-around items-center mb-4">
                <div className="flex flex-col items-start w-[40%]">
                    {/* Pick-Up Section */}
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="radio"
                            name="pickDrop"
                            id="pick"
                            checked={pickDrop === 'pick'}
                            onChange={handleRadioChange}
                            className="cursor-pointer"
                        />
                        <label htmlFor="pick" className="block text-sm font-semibold cursor-pointer">Pick-Up</label>
                    </div>
                    <select className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                        <option>Select your city</option>
                        <option>City 1</option>
                        <option>City 2</option>
                        <option>City 3</option>
                    </select>
                    <label htmlFor="datePick" className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        id="datePick"
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <label htmlFor="timePick" className="block text-sm font-semibold mb-1">Time</label>
                    <input
                        type="time"
                        id="timePick"
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col items-start w-[40%]">
                    {/* Drop-Off Section */}
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="radio"
                            name="pickDrop"
                            id="drop"
                            checked={pickDrop === 'drop'}
                            onChange={handleRadioChange}
                            className="cursor-pointer"
                        />
                        <label htmlFor="drop" className="block text-sm font-semibold cursor-pointer">Drop-Off</label>
                    </div>
                    <select className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                        <option>Select your city</option>
                        <option>City 1</option>
                        <option>City 2</option>
                        <option>City 3</option>
                    </select>
                    <label htmlFor="dateDrop" className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        id="dateDrop"
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <label htmlFor="timeDrop" className="block text-sm font-semibold mb-1">Time</label>
                    <input
                        type="time"
                        id="timeDrop"
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
