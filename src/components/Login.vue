<script setup>
import axios from 'axios';
import router from '@/router';

function handleSubmit(){
    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    
    axios.post('http://localhost:8080/auth/signIn', user)
    .then((response) => {
        console.log(response.data)
        const array = response.data
        console.log(array[0] + "Token")
        console.log(array[1] + "UserID")
        localStorage.setItem('token', array[0]);
        localStorage.setItem("userId", array[1])
        router.push('/')
    })
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
    
            <form @submit.prevent="handleSubmit" th:object="${user}" method="POST">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
    
            <label for="password">Password</label>
            <input type="password" id="password" name="password" autocomplete="current-password" required>
            <button type="submit">Log In</button>
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
aside{
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

main form button{
    border: 1px solid black;
    height: 40px;
    color: white;
    background-color: rgb(26, 25, 25);
    border-radius: 20px;
}

</style>