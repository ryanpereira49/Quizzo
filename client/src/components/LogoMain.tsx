import React from 'react'
import logoMain from '../assets/LogoMain.svg'

interface LogoMainProps {
    cstyles?: string
}

const LogoMain: React.FC<LogoMainProps> = ({ cstyles }) => {
  return (
    <>
      <img src={logoMain} alt='logoMain' className={cstyles}/>
    </>
  )
}

export default LogoMain;