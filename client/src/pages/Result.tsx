import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LogoBig from '../components/LogoBig'
import LogoMain from '../components/LogoMain'
import LogoComplete from '../components/LogoComplete'
import ProgressBarCircle from '../components/ProgressBarCircle'
import Container from '../components/Container';
import ButtonGlass from '../components/ButtonGlass';
import ContainerGreen from '../components/ContainerGreen'
import ContainerRed from '../components/ContainerRed'

interface ResultState {
    score: number,
    total: number,
    quizId: any
}

export default function Result() {

    const { state } = useLocation()

    const { score, total }: ResultState = state
    const [showScore, setShowScore] = useState<boolean>(false)
    const [result, setResult] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = () => {
        const thirty_percent = total * 0.30;
        if (score > thirty_percent) {
            setResult(true)
        }
        setShowScore(true)
    }

    return (
        <div className='bg-image p-6 flex flex-col gap-y-8'>
            <header>
                <LogoMain cstyles='h-20 md:hidden' />
                <LogoBig cstyles='hidden md:block' />
            </header>
            <div className='flex grow items-center justify-center'>
                <div className='flex flex-col gap-y-6'>
                    {showScore? (
                        result? (
                            <ContainerGreen className='flex flex-col p-8 items-center gap-y-3'>
                                <ProgressBarCircle score={score} maxScore={total}/>
                                <p className='text-white text-2xl font-bold'>Congrulations!</p>
                                <p className='text-white'>You passed the quiz!</p>
                                <ButtonGlass onClick={() => { navigate('/category') }}>Home</ButtonGlass>
                            </ContainerGreen>
                        ):
                        (
                            <ContainerRed className='flex flex-col p-8 items-center gap-y-3'>
                                <ProgressBarCircle score={score} maxScore={total}/>
                                <p className='text-white text-2xl font-bold'>Sorry!</p>
                                <p className='text-white'>You failed the quiz!</p>
                                <ButtonGlass onClick={() => { navigate('/category') }}>Home</ButtonGlass>
                            </ContainerRed>
                        )
                    ):
                    (
                        <Container className='flex flex-col p-8 items-center gap-y-3'>
                            <LogoComplete cstyles='h-32'/>
                            <p className='text-white text-2xl font-bold'>Quiz Completed</p>
                            <p className='text-white'>Check Your Results Here!</p>
                            <ButtonGlass onClick={() => { handleSubmit() }}>Results</ButtonGlass>
                        </Container>
                    )

                    }
                </div>
            </div>
        </div>
    )
}

/**
 <div className='bg-image h-svh flex flex-col justify-normal p-6'>
            <header className='flex flex-col items-center md:block'>
                <LogoMain cstyles='h-32 md:hidden' />
                <LogoBig cstyles='hidden md:block' />
            </header>
            <main className='flex flex-grow justify-center items-center'>
                <div className='bg-white bg-opacity-75 shadow-lg rounded-lg p-6 flex flex-col justify-center w-full md:w-1/2 md:h-3/4'>
                    {showScore? (
                        result?(
                            <div className='flex flex-col items-center pb-8 pt-2'>
                                <ProgressBarCircle score={score} maxScore={total}/>
                                <p className='font-bold text-xl pt-8'>Congrulations!</p>
                                <p className=''>You passed the quiz!</p>
                                <button onClick={() => { navigate('/category') }} className='bg-[#623878] px-4 py-2 my-4 rounded-md text-white'>Home</button>
                            </div>
                        ):(
                            <div className='flex flex-col items-center pb-8 pt-2'>
                                <ProgressBarCircle score={score} maxScore={total}/>
                                <p className='font-bold text-xl pt-8'>Sorry!</p>
                                <p className=''>You failed the quiz!</p>
                                <button onClick={() => { navigate('/quiz',{state:{id:quizId}})} } className='bg-[#623878] px-4 py-2 my-4 rounded-md text-white'>Try Again</button>
                            </div>
                        )
                    ):(
                        <div className='flex flex-col items-center pb-8 pt-2'>
                            <LogoComplete cstyles='h-32'/>
                            <p className='font-bold text-xl'>Quiz Completed</p>
                            <p className=''>Check Your Results Here!</p>
                            <button onClick={() => { handleSubmit() }} className='bg-[#6F8437] px-4 py-2 my-4 rounded-md text-white'>Results</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
 */