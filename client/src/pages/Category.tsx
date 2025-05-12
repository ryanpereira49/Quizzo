import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Quiz from './Quiz'
import ActionButton from '../components/ActionButton'
import LogoMain from '../components/LogoMain'
import CategoryButton from '../components/CategoryButton'

interface Option {
  _id: string,
  text: string
}

interface Question {
  _id: string,
  questionText: string,
  options: Option[],
  correctAnswer: string,
}

interface Quiz {
  _id: string,
  title: string,
  description: string,
  questions: Question[],
  createdAt: string,
  __v?: number

}

export default function Category() {

  const [data, setData] = useState<Quiz[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const getQuizes = async () => {
      try {
        const response = await axios.get<Quiz[]>("/api/getAllQuizzes")
        setData(response.data)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An Unknown Error Occured")
        }
        setLoading(false)
      }
    }
    getQuizes()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='bg-categoryPage flex flex-col items-center justify-center px-6'>
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
  )
}
