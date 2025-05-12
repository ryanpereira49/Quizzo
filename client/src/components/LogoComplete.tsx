import React from 'react'
import logoComplete from '../assets/LogoComplete.svg'

interface LogoCompleteProps {
    cstyles?: string
}

const LogoComplete: React.FC<LogoCompleteProps> = ({ cstyles }) => {
  return (
    <>
      <img src={logoComplete} alt='logoComplete' className={cstyles}/>
    </>
  )
}

export default LogoComplete;