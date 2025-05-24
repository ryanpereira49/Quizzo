import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
}

const ContainerRed: React.FC<Props> = ({children, className}) => {
    return(
        <div className={`glassmorph-red p-4 ${className}`}>
            {children}
        </div>
    )
}

export default ContainerRed