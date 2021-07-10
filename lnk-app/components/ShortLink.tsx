import React from 'react';

interface Props {
    content: string | null;
    hidden: boolean;
}

export default function ShortLink({ content, hidden }: Props) {

    const baseStyle = "text-violet text-md relative bg-white rounded border-0 shadow outline-none focus:outline-none w-full transition-opacity duration-300";

    const style = hidden ? `${baseStyle} h-0 p-0 opacity-0`: `${baseStyle} p-3 opacity-1`;

    return (
        <p className={style}>
            {content}
        </p>
    )
}