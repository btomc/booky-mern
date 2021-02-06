import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Lucy Miller',
        email: 'lucy@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Tom Clark',
        email: 'clark@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
]

export default users