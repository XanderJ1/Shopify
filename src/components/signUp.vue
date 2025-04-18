<script setup>
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

function handleSubmit(){
    console.log('hello');


    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const array = [username, email, password, role];
    console.log(array);

    axios.post('http://localhost:8080/auth/register', {
        username: username,
        email: email,
        password: password,
        role: role
    })
    .then((response) => {
        console.log(response.data);
        router.push('/login');
    })
    .catch((error) => {
        console.log(error);
    });

}
</script>

<template>
<body>
    <div class="container">
    <main>
        <div class="other">
            <h3>Create Your Account</h3>
            <p>Let's get started with your 30 days free trial</p>
            <div class="google">
                <img src="../assets/images/google.svg" alt="Google">
                <p>Sign Up with Google</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" >
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>

        <label for="email">Email</label>
        <input type="text" id="email" name="email" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <select name="role" id="role">
            <option value="BUYER">BUYER</option>
            <option value="SELLER">SELLER</option>

        </select>

            <button type="submit">Sign Up</button>
            <p class="Login">Already have an acount?  <RouterLink to="/login"><span>Log in</span></RouterLink></p>
        </form>
    </main>

    <aside>
        <img src="../assets/images/task.jpg" alt="">
    </aside>
</div>

</body>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
}

logo{
    display: flex;
    height: 50px;
    width: 15px;
}
.Login{
    font-size: 20px;
}
.container{
    display: flex;
    justify-content: space-around;
    height: 100vh;
    background: #f1f1f1;
    margin: 4rem 6rem;
}
main{
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f1f1f1;
}
aside img{
    width: 40rem;
    flex-basis: 40%;
    height: 85vh;
    margin-top: 20px;
}
.other{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f1f1f1;
}

.other .google{
    margin: 20px 0px 0px 0px;
    border: 1px solid black;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
}
.other p{
    margin-bottom: 10px;
}
.other img{
    width:  15px;
    height: 15px;
    margin-bottom: 8px;
    margin-right: 8px;
}
.other h3{
    font-size: 2rem;
    margin-bottom: 20px;
}

main h3{
    font-size: 2rem;
    margin-bottom: 20px;
}

main form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    margin: 50px;
}

.test{
border: 1px solid black;
border-radius: 10px;
}

main form input{
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 20px;
}

#role{
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 20px;
}
main form button{
    border: 1px solid black;
    height: 3rem;
    margin: 10px 0px 10px;
    color: white;
    background-color: rgb(26, 25, 25);
    border-radius: 20px;
}

</style>