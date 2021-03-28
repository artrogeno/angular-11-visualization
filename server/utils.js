const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
'.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFydGh1ciBTaWx2YSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJleHAiOjE2NDQ1NTA4OTl9'+
'.BKx2yKdzMoY85W5lGakX8dJGqdqIvX3BUD4AQtxIRLs'

module.exports = { 
  isAuthorized: (req) => {
    if (req.path === '/api/signin') {
      return true
    }
    const jwtToken = req.headers['authorization']

    if (jwtToken) {
      return jwtToken.split('Bearer ')[1] === token
    }
  },
  login: (req) => {
    if (req.method === 'POST') {
      const { email, password } = req.body
      if (email === 'admin@mail.com' && password === '123456') {
        return token
      }
    }
  }
}
