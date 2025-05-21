import { useNavigate } from 'react-router-dom'
import LogoMain from '../components/LogoMain'
import Container from '../components/Container'
import ButtonGlass from '../components/ButtonGlass'
//import FooterCustom from '../components/FooterCustom'
//import ActionButton from '../components/ActionButton'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className='bg-image flex flex-col items-center justify-center'>
      <Container className='gap-y-8 md:gap-y-6'>
        <LogoMain cstyles='h-44 md:h-64' />
        <ButtonGlass onClick={() => navigate("/category")}>Let's Start</ButtonGlass>
      </Container>
    </div>
  )
}

/*
<div className='bg-image flex flex-col items-center '>
        <div className='flex flex-grow items-center justify-center'>
          <LogoMain cstyles='h-44 md:h-64' />
        </div>
        <div className='w-full flex justify-center mb-32 px-6'>
          <ActionButton onClick={() => navigate("/category")} text="Let's Start" cstyles='w-full py-6 md:py-8 md:w-1/4' />
        </div>
        <FooterCustom/>
    </div>

*/