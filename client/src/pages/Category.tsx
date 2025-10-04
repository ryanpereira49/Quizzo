import { useState } from 'react'
//import Quiz from './Quiz'
import LogoMain from '../components/LogoMain'
import Container from '../components/Container'
//import ActionButton from '../components/ActionButton'
import { useNavigate } from 'react-router-dom'
import ButtonGlass from '../components/ButtonGlass'

export default function Category() {

  const levels = ["Easy", "Medium", "Hard"]
  const length = {5: 'Short', 10: 'Default', 15: 'Long'}

  const [topic, setTopic] = useState<string | null>("Jurrasic Park")
  const [difficulty, setDifficulty] = useState<string>("Medium")
  const [difficultyValue, setDifficultyValue] = useState<number>(1)
  const [quizLength, setQuizLength] = useState<number>(5)

  const navigate = useNavigate()

  const handleSubmit = () =>  {
    navigate('/quiz', {state:{topic: topic, quizLength: quizLength, difficulty: difficulty}})
  } 

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  }

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    setDifficultyValue(newValue)
    setDifficulty(levels[newValue])
  }

  return (
    <div className='bg-image flex flex-col items-center justify-center'>
      <Container className='flex flex-col items-center mx-8 gap-y-4'>
        <LogoMain cstyles='h-32 md:h-44' />
          <input 
          type='text'
          placeholder="Enter a topic"
          onChange={handleTextChange}
          className='bg-white p-2 rounded-xl '
          />
        <div id='difficulty-slider'>
          <input
            type='range'
            min='0'
            max='2'
            step='1'
            value={difficultyValue}
            onChange={handleDifficultyChange}
            className="styled-slider w-full"
          />
          <div className="flex justify-between text-sm font-medium px-1">
            {levels.map((label, idx) => (
              <span key={label} className={difficultyValue === idx ? "text-white" : "text-gray-500"}>
                {label}
              </span>
            ))}
          </div>
          </div>
          <div id='length-slider'>
            <input
            type='range'
            min='5'
            max='15'
            step='5'
            value={quizLength}
            onChange={(e) => setQuizLength(parseInt(e.target.value))}
            className="styled-slider w-full"
          />
          <div className="flex justify-between text-sm font-medium px-1">
            {Object.entries(length).map(([value, label]) => (
              <span key={value} className={parseInt(value) === quizLength ? "text-white" : "text-gray-500"}>
                {label}
                </span>
              ))}
            </div>
          </div>
          <ButtonGlass onClick={handleSubmit}>Generate Quiz</ButtonGlass>
      </Container>
    </div>
  )
}

/**
 <div className='bg-image flex flex-col items-center justify-center px-6'>
      <div className='flex items-center  justify-center mb-8'>
        <LogoMain cstyles='h-32 md:h-44' />
      </div>
      <div className=' grid grid-cols-2 gap-4 mb-8 md:grid-cols-4 md:gap-4 md:content-center'>
        {data?.map((quiz, index) => (
        <CategoryButton key={quiz._id} qid={quiz._id} catno={index.toString()} />
      ))}
      </div>
      <div className='w-full flex justify-center '>
        <ActionButton onClick={() => navigate("/category")} text="Select a category" cstyles='w-full py-6 md:py-8 md:w-1/4' />
      </div>
    </div>
 */
