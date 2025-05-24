import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
}

const ContainerGreen: React.FC<Props> = ({children, className}) => {
    return(
        <div className={`glassmorph-green p-4 ${className}`}>
            {children}
        </div>
    )
}

export default ContainerGreen