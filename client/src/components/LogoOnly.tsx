import React from 'react'
import logoOnly from '../assets/LogoOnly.svg'

interface LogoOnlyProps {
    cstyles?: string
}

const LogoOnly: React.FC<LogoOnlyProps> = ({ cstyles }) => {
    return (
      <>
        <img src={logoOnly} alt='logoOnly' className={cstyles}/>
      </>
    )
  }
  
  export default LogoOnly;
