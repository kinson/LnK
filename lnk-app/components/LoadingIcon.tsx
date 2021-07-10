import React from 'react';
import Icon from './Icon';

interface Props {
    show: boolean;
}

export default function LoadingIcon({ show }: Props) {

    const baseStyle = "rounded-full w-14 bg-purple flex items-center justify-center transition-opacity duration-300 delay-75";

    const style = show ? `${baseStyle} opacity-1 h-14` : `${baseStyle} opacity-0 h-0`;

    return (
        <div className={style}>
            <div className="animate-pulse text-white">
                <Icon size="small" />
            </div>
        </div>
    )
}