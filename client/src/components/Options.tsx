import React, { useState } from 'react'

interface Option {
  oid: string;
  otext: string;
}

interface OptionProps {
  options: Option[];
  onOptionSelect: (oid: string) => void;
}

const Options: React.FC<OptionProps> = ({ options, onOptionSelect }) => {
  const [selectedOption, setSelectOption] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectOid = event.target.value;
    setSelectOption(selectOid);
    onOptionSelect(selectOid)
  }

  return (
    <div className='md:grid md:grid-cols-2 md:gap-4'>
      {options.map((option) => (
        <div key={option.oid}>
          <label className='glassmorph-blur flex p-2 my-3 md:my-0'>
            <input
              type='radio'
              name='options'
              value={option.oid}
              onChange={handleChange}
              checked={selectedOption === option.oid}
            />{' '}
            <p className='ml-3 text-white'>{option.otext}</p>
          </label>
        </div>
      ))}
    </div>
  )
}

export default Options;