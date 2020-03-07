import React, { memo } from "react"

const Checkbox = props => {
    return (
        <label className="flex justify-start items-center cursor-pointer">
            <div className="bg-white border-2 rounded border-gray-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input type="checkbox" checked={props.value} {...props} className="opacity-0 absolute cursor-pointer" />
                <svg className="fill-current hidden w-2 h-2 text-green-800 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
            <div className="select-none text-sm cursor-pointer">{props.label}</div>
        </label>
    )
}

export default memo(Checkbox)

