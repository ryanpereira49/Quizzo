import React from 'react'
import { useNavigate } from 'react-router-dom'
import cat0 from '../assets/cat0.svg'
import cat1 from '../assets/cat1.svg'
import cat2 from '../assets/cat2.svg'
import cat3 from '../assets/cat3.svg'

interface CategoryButtonProps {
  catno: string
  qid: string
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ qid, catno }) => {

  const navigate = useNavigate()

  const catImg: { [key: string]: string } = {
    '0': cat0,
    '1': cat1,
    '2': cat2,
    '3': cat3,
  }

  return (
    <div>
      <button className=' w-40 h-40 flex items-center justify-center rounded-md' onClick={() => { navigate('/quiz', { state: { id: qid } }) }}>
        <img src={catImg[catno]} />
      </button>
    </div>
  )
}

export default CategoryButton;
