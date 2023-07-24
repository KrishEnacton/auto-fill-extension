import React from 'react'
import { EducationProps } from '../../../global'

const ErrorText: React.FC<{ error?: string; touched?: boolean; formElem?: EducationProps }> = ({
  error,
  touched,
  formElem,
}) => {
  return (
    <>
      {formElem ? (
        <>
          {error ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{error}</div>
          ) : (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left invisible">error</div>
          )}
        </>
      ) : (
        <>
          {error && touched ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{error}</div>
          ) : (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left invisible">error</div>
          )}
        </>
      )}
    </>
  )
}
export default ErrorText
