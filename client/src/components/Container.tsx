import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<Props> = ({children, className}) => {
    return(
        <div className={`glassmorph p-4 ${className}`}>
            {children}
        </div>
    )
}

export default Container