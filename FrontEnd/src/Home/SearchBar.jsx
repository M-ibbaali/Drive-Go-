import {useState} from 'react'
import { FaExchangeAlt } from 'react-icons/fa'

function SearchBar() {
    const [pickDrop, setPickDrop] = useState('pick')
    
    const handleRadioChange = (event) => {
        setPickDrop(event.target.id)
    }

    return (
        <>
            <div className="flex justify-around items-center bg-tertiary p-3">
                <div className="flex items-center gap-2 bg-white w-[40%] h-[8rem] p-4 rounded-lg shadow-md">
                    {/* Pick-Up Section */}
                    <div className="flex-1">
                        <div className="flex gap-1 mb-3">
                            <input
                                type="radio" name="pickDrop" id="pick"
                                checked={pickDrop === 'pick'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="pick" className="block text-sm font-semibold">Pick-Up</label>
                        </div>
                        <select className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select your city</option>
                            <option>City 1</option>
                            <option>City 2</option>
                            <option>City 3</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="datePick" className="block text-sm font-semibold mb-3">Date</label>
                        <input type="date" id="datePick" className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="timePick" className="block text-sm font-semibold mb-3">Time</label>
                        <input type="time" id="timePick" className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-md mx-2">
                    <FaExchangeAlt className="text-lg" />
                </button>

                <div className="flex items-center gap-2 bg-white w-[40%] h-[8rem] p-4 rounded-lg shadow-md">
                    {/* Drop-Off Section */}
                    <div className="flex-1">
                        <div className="flex gap-1 mb-3">
                            <input
                                type="radio" name="pickDrop" id="drop"
                                checked={pickDrop === 'drop'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="drop" className="block text-sm font-semibold">Drop-Off</label>
                        </div>
                        <select className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select your city</option>
                            <option>City 1</option>
                            <option>City 2</option>
                            <option>City 3</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="dateDrop" className="block text-sm font-semibold mb-3">Date</label>
                        <input type="date" id="dateDrop" className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="timeDrop" className="block text-sm font-semibold mb-3">Time</label>
                        <input type="time" id="timeDrop" className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
