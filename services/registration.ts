import axios from 'axios';

type User = {
    name: string;
    email: string;
    password: string;
}

async function registerUser(user: User) {
    let client = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-secret': process.env.AUTH_SECRET
        }
    });

    try {
        var response = await client.post('/users', {
            name: user.name,
            email: user.email,
        })

        let user_id = response.data['id']
        let username = user.email.split('@')[0]

        var response = await client.post('/users/credentials', {
            user_id: user_id,
            username: username,
            password: user.password
        })

        console.log(response.data)

        return response.data
    }

    catch (error) {
        console.log(error)
        return null;
    }
}

export { registerUser }