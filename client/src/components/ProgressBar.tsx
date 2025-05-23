import React from 'react'

interface ProgressBarProps {
    pindex: number
    plength: number
}



const ProgressBar: React.FC<ProgressBarProps> = ({ pindex, plength }) => {

    const progress = (pindex / plength) * 100;

    return (
        <div>
            <div className='glassmorph h-[14px] rounded-md shadow-md flex items-center'>
                <div className='bg-white h-[10px] rounded-md shadow-md transition-all durati1on-300 mx-[2px]' style={{ width: `${progress}%` }} ></div>
            </div>
            <p className='text-white'>Question: {pindex} / {plength}</p>
        </div>
    )
}

export default ProgressBar;