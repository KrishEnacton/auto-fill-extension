import React from 'react'

const ErrorText: React.FC<{ error?: string; touched?: boolean }> = ({ error, touched }) => {
  return (
    <>
      {error && touched ? (
        <div className="mt-2 ml-1 text-xs text-red-500 text-left">{error}</div>
      ) : null}
    </>
  )
}
export default ErrorText
