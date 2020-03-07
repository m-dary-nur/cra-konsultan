import React, { memo, forwardRef } from "react"

const Field = forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref} className="focus:border-teal-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autoComplete="false" spellCheck={false} />
    )
})

export default memo(Field)