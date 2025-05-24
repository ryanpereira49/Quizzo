import React from 'react'

interface ProgressBarCircleProps {
    score: number; // Current score
    maxScore: number; // Maximum score
    size?: number; // Diameter of the circle
    strokeWidth?: number; // Thickness of the circle
}

const ProgressBarCircle: React.FC<ProgressBarCircleProps> = ({ score, maxScore, size = 150, strokeWidth = 10 }) => {

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min((score / maxScore) * 100, 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke='#FFFFFF4A'
                    strokeWidth={strokeWidth}
                    
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#FFFFFF"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />
            </svg>
            {/* Percentage Display */}
            <div className="absolute text-center">
                <span className="text-xl font-bold text-white">{score+'/'+maxScore}</span>
            </div>
        </div>
    );
}

export default ProgressBarCircle
