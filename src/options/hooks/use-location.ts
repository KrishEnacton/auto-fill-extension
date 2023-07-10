function useLocation() {
  const getLocation = async (name: any): Promise<boolean | any> => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${name}`, {
        headers: {
          'X-Api-Key': '3JjdAUBs/ROjkHJ8xjw/JQ==SBFKS4xQwdaAA9ZX',
        },
      })
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getLocation,
  }
}

export default useLocation
