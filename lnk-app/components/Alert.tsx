import React from 'react';

interface Props {
    children: string;
}

export default function Alert({ children }: Props) {
    return (
        <p className="my-8 rounded-md bg-red-200 border-2 border-red-400 text-red-700 p-4">
            {children}
        </p>
    )
}