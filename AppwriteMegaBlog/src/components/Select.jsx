import React from 'react'

const Select = ({
    options,
    label,
    className = '',
    ref,
    ...props
}) => {
    const id = React.useId();
    return (
        <div className='w-full'>
            {label && <label className='block mb-2 font-medium text-gray-700'>{label}</label>}

            <select
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select