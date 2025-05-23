import React from 'react'
import logoWord from '../assets/LogoWord.svg'
import logoExit from '../assets/LogoButtonExit.svg'
import { useNavigate } from 'react-router-dom'

interface LogoBigProps {
    cstyles?: string
}

const LogoBig: React.FC<LogoBigProps> = ({ cstyles }) => {

    const navigate = useNavigate()

    return (
        <>
            <div className={cstyles}>
                <div className='flex justify-between items-center border-b-2 border-[#ffffff]'>
                    <img src={logoWord} alt='logoWord' className='h-20' />
                    <button onClick={() => {navigate('/category')}}><img src={logoExit} alt='logoExit' className='size-12' /></button>
                </div>
            </div>
        </>
    )
}

export default LogoBig;