import React from 'react'

interface RadioProps {
  submitted: string | undefined,
  correct: string | undefined,
  oid: string | undefined,
  text: string | undefined,
}

const Radio: React.FC<RadioProps> = ({ submitted, correct, oid, text }) => {

  if(oid == submitted && submitted == correct){
    return (
      <li className='border-green-500 border-2 p-2' key={oid}>
        <input
          type='radio'
          name='options'
          value={oid}
        />{' '}
        {text}
      </li>
    )
  }

  if(oid == submitted && submitted != correct){
    return (
      <li className='border-red-500 border-2 p-2' key={oid}>
        <input
          type='radio'
          name='options'
          value={oid}
        />{' '}
        {text}
      </li>
    )
  }

  if(oid != submitted ){
    return (
      <li key={oid}>
        <input
          type='radio'
          name='options'
          value={oid}
        />{' '}
        {text}
      </li>
    )
  }
  
}

export default Radio;