import { useRecoilState } from 'recoil'
import { educationListAtom, experienceListAtom, projectsListAtom, updateArray } from '../../atoms'
import {
  checkDuplicates,
  checkMajorExistence,
  isDuplicateProject,
  notify,
  replaceFields,
} from '../../utils'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage, setChromeStorage } =
    useLocalStorage()
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [projectsList, setProjectsList] = useRecoilState(projectsListAtom)
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const authResponse = getLocalStorage('sb-tjffakoooclofjvodqsx-auth-token')
  const response = getLocalStorage('user')
  const email = response?.email ?? authResponse?.user?.email

  function setUserDetails(userDetails: any) {
    const users = getLocalStorage('users')
    const updatedArr = users.map((user: any) => {
      if (Object.keys(user)[0] == email) {
        return { [Object.keys(user)[0]]: userDetails }
      }
      return user
    })
    setLocalStorage('users', updatedArr)
    setChromeStorage('users', updatedArr)
  }

  function getUserInfo() {
    let users = getLocalStorage('users') ?? []
    const currentUser = users.find((user: any) => {
      if (Object.keys(user)[0] == email) {
        return user
      }
    })
    if (!currentUser) {
      if (users && users?.length == 0 && !currentUser) {
        if (!email) return
        setLocalStorage('users', [{ [email]: {} }])
        setChromeStorage('users', [{ [email]: {} }])
      } else {
        setLocalStorage('users', [...users, { [email]: {} }])
        setChromeStorage('users', [...users, { [email]: {} }])
          .then((res) => {})
          .catch((err) => {
            console.log(err, 'error while storing user info')
          })
      }
      return {}
    }
    return Object.values(currentUser)[0] as any
  }

  const setUserInfo = (userParams: any): boolean => {
    const res = getUserInfo()
    const [key, value]: [string, any] = Object.entries(userParams)[0]
    if (res && Object.values(res)?.length > 0) {
      if (key == 'experience') {
        const newArray = [...value]

        if (value.length > 0 && value[value.length - 1].is_working_currently) {
          newArray[value.length - 1] = {
            ...value[value.length - 1],
            end_month: '',
            end_year: '',
          }
          setUserDetails({
            ...res,
            experience: newArray,
          })
          return true
        }
      }
      setUserDetails({ ...res, [key]: value })
      return true
    } else {
      if (key == 'experience') {
        const newArray = [...value]

        if (value.length > 0 && value[value.length - 1].is_working_currently) {
          newArray[value.length - 1] = {
            ...value[value.length - 1],
            end_month: '',
            end_year: '',
          }
          setUserDetails({
            ...res,
            experience: newArray,
          })
          return true
        }
        setUserDetails({ ...userParams })
        return true
      }
      setUserDetails({ ...userParams })
      return true
    }
  }

  const updateEducationList = (updatedArray: any, setUpdatedArray: any, next = false) => {
    const res: any = getUserInfo()
    if (updatedArray.length > 0) {
      if (checkMajorExistence(res.education, updatedArray) == 'already present') {
        notify('Education with this major & degree already exists', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
        notify('Please enter different majors & degree for different education', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
        setUserDetails({
          ...res,
          education: replaceFields(res.education, updatedArray),
        })
        setEducationList(replaceFields(res.education, updatedArray))
        notify('Data Saved', 'success')
        setUpdatedArray([])
        return true
      }
    }
    setUpdatedArray([])
    return true
  }

  const updateProjectsList = (updatedArray: any, setUpdatedArray: any, next = false) => {
    const res: any = getUserInfo()
    if (updatedArray.length > 0) {
      if (isDuplicateProject(res.projects, updatedArray) == 'already present') {
        notify('projects with this major & degree already exists', 'error')
        return false
      } else if (isDuplicateProject(res.projects, updatedArray) == 'duplicate data') {
        notify('Please enter different title and description for different projects', 'error')
        return false
      } else if (isDuplicateProject(res.projects, updatedArray) == 'success') {
        setUserDetails({
          ...res,
          projects: replaceFields(res.projects, updatedArray),
        })
        setProjectsList(replaceFields(res.projects, updatedArray))
        notify('Data Saved', 'success')
        setUpdatedArray([])
        return true
      }
    }
    setUpdatedArray([])
    return true
  }

  const updateExpList = (updatedArray: any, setUpdatedArray: any, next = false) => {
    const res: any = getUserInfo()
    if (updatedArray.length > 0) {
      if (checkDuplicates(res.experience, updatedArray) == 'already present') {
        notify('Experience with this position is already exists', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
        notify('Please enter different positions for different experience', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
        setUserDetails({
          ...res,
          experience: replaceFields(res.experience, updatedArray),
        })
        setExperiences(replaceFields(res.experience, updatedArray))
        notify('Data Saved', 'success')
        setUpdatedArray([])
        return true
      }
    }
    setUpdatedArray([])
    return true
  }

  const getUserDetails = () => {
    return getLocalStorage('user')
  }

  const clearUserInfo = () => {
    clearLocalStorage('userInfo')
  }

  return {
    setUserInfo,
    getUserInfo,
    clearUserInfo,
    updateEducationList,
    updateProjectsList,
    updateExpList,
    getUserDetails,
  }
}

export default useStorage
