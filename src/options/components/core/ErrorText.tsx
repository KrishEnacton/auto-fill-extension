import React from 'react'
import { EducationProps } from '../../../global'

const ErrorText: React.FC<{ error?: string; touched?: boolean; education?: EducationProps }> = ({
  error,
  touched,
  education,
}) => {
  return (
    <>
      {education ? (
        <>
          {error ? <div className="mt-2 ml-1 text-xs text-red-500 text-left">{error}</div> : null}
        </>
      ) : (
        <>
          {error && touched ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{error}</div>
          ) : null}
        </>
      )}
    </>
  )
}
export default ErrorText
