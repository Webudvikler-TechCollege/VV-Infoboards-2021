export async function doFetch(url, type, data) {

  let method = type || 'GET'
  let body = data || null 

  const options = {
    method : method,
    body : body
  }

  try{
    const response = await fetch(url, options) 
    const data = await response.json()
    return data
  }

  catch(error) {
    console.log(error)
  }
}