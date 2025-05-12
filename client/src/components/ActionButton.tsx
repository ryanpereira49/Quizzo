import React from 'react'

interface ActionButtonProps {
    text: string,
    onClick: () => void;
    cstyles?: string;

}

const ActionButton: React.FC<ActionButtonProps> = ({text, onClick, cstyles}) => {
  return (
    <>
      <button className={`px-4 font-bold text-white bg-actionButton rounded-xl shadow-md shadown-custom-bottom ${cstyles} `} onClick={onClick}>{text}</button>
    </>
  )
}

export default ActionButton;