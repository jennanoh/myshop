import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'adminuser@gmail.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('123456',10),
  },  
  {
    name: 'John Doer',
    email: 'johndoer@gmail.com',
    password: bcrypt.hashSync('123456',10),

  },
]

export default users