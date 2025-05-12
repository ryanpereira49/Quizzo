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
    <div className='md:grid md:grid-cols-2'>
        {options.map((option) => (
          <div key={option.oid}>
            <label className='border-2 border-[#94819E] p-2 flex m-3 rounded-md'>
              <input
                type='radio'
                name='options'
                value={option.oid}
                onChange={handleChange}
                checked={selectedOption === option.oid}
              />{' '}
              <p className='ml-3'>{option.otext}</p>
            </label>
          </div>
        ))}
    </div>
  )
}

export default Options;