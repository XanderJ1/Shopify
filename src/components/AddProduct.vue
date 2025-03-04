<script setup>
import axios from 'axios';
function handleSubmit() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const productDTO = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseInt(document.getElementById('price').value)
    };


    const fileInput = document.getElementById('file');

    console.log(productDTO);
    console.log(fileInput);
    
    const formData = new FormData();
    formData.append('productDTO', new Blob([JSON.stringify(productDTO)], {type: 'application/json'}));
    formData.append('file', fileInput.files[0]);

    axios.post("http://localhost:8080/api/v1/products/addProduct", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        alert(response.data)

    })
    .catch(error => console.error(error));
}
</script>

<template>
    <main>
    <div class="test">
        <form @submit.prevent="handleSubmit" >
            <label for="name">Name</label>
            <input type="name" id="name" name="name" required>

            <label for="description">Description</label>
            <input type="text" id="description" name="description" required>

            <label for="price">Price</label>
            <input type="price" id="price" name="price" required>

            <label for="file"> Image</label>
            <input type="file" id="file" name="file" >

            <button>Submit</button>
        </form>
    </div>
</main>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
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
    width: 15px;
    height: 15px;
    margin-right: 6px;
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

main form select{
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 20px;
}

form .gree{
    display: flex;
    margin-bottom: 10px;
}

form .gree input{
    width: 12px;
    margin-right: 5px;
}

main form button{
    border: 1px solid black;
    height: 30px;
    color: white;
    background-color: rgb(26, 25, 25);
    border-radius: 20px;
}

</style>