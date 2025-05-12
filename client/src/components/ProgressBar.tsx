import React from 'react'

interface ProgressBarProps {
    pindex: number
    plength: number
}



const ProgressBar: React.FC<ProgressBarProps> = ({ pindex, plength }) => {

    const progress = (pindex / plength) * 100;

    return (
        <>
            <div className='bg-[#623878] h-[14px] rounded-md shadow-md flex items-center'>
                <div className='bg-[#DDFF6F] h-[10px] rounded-md shadow-md transition-all durati1on-300 mx-[2px]' style={{ width: `${progress}%` }} ></div>
            </div>
            <p>Question: {pindex} / {plength}</p>
        </>
    )
}

export default ProgressBar;