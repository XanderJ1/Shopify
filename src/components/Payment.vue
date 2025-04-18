<script setup>

</script>
<template>
    <header>
        ACECOIN PAY
    </header>
    <main>
        <div class="left">
            <div class="first">
                <div class="left">
                <h3>Card Number</h3>
                <p>Enter the 16-digit card number on the card</p>
                </div>
                <div class="field">
                    <input type="text" placeholder="1234-4567-8910-1112-1314">
                </div>
                </div>
                <div class="second">
                    <div class="cvv">
                        <h3>CVV Number</h3>
                        <p>Enter the 3 or 4 digit number on the card</p>
                    </div>
                    <div class="cvv-field">
                        <input type="number">
                    </div>
                </div>
                <div class="third">
                    <div class="exp-date">
                        <h3>Expiry date</h3>
                        <p>Enter the expiration date of the card</p>
                    </div>
                    <div class="month">
                        <input type="number">
                    </div>
                    <h3>/</h3>
                    <div class="year">
                        <input type="number">
                    </div>
                </div>
                <div class="fourth">
                    <div class="password">
                        <h3>Password</h3>
                        <p>Enter your password</p>
                    </div>
                    <div class="passfield">
                        <input type="password">
                    </div>
                </div>
        
                <button class="payButton">
                    <i class="fas fa-lock"></i> <h2>Pay Now</h2>
                </button>
        </div>
        <div class="right">
            <div class="layer">
                <p>Company</p>
                <span>Apple</span>
            </div>
            <div class="layer">
                <p>Order number</p>
                <span>#203949</span>
            </div>
            <div class="layer">
                <p>Product</p>
                <span>Macbook Air</span>
            </div>
        </div>
    </main>
</template>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', serif;
}
header{
    margin: 5rem 20rem 0rem 20rem;
}
h3{
    font-size: 16px;
    margin-bottom: 5px;
    color: rgb(28, 27, 27);
}
p{
    font-size: 12px;
    color: gray;
    margin-bottom: 10px;
}
main{
    margin: 2rem 20rem 0rem 20rem;
    max-width: 3000px;
    display: flex;
    justify-content: space-between;
}
.first{
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
.field input{
    padding: 15px;
    width: 35rem;
    height: 4rem;
    border: 1px solid rgb(224, 221, 221);
    border-radius: 5px;
}

.second{
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    max-width: 35rem;
}
.second .cvv{
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
}
.second .cvv-field input{
    font-weight: 500;
    text-align: center;
    width: 20rem;
    height: 4rem;
    border: 1px solid gray;
    border-radius: 5px;
    margin-left: 2rem;
    
}
.third{
    display: flex;
    justify-content: space-between;
    max-width: 35rem;
    margin-bottom: 15px;
}
.third h3{
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
}
.third .exp-date{
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
}
.third .month input{
    width: 9rem;
    height: 4rem;
    border: 1px solid gray;
    border-radius: 5px;
    max-width: 9rem;
    margin-left: 1rem;
    text-align: center;
}
.third .year input{
    width: 9rem;
    text-align: center;
    height: 4rem;
    border: 1px solid gray;
    border-radius: 5px;
    max-width: 9rem;
}
.fourth{
    display: flex;
    justify-content: space-between;
    max-width: 35rem;
    margin-bottom: 15px;
}
.fourth .password{
    display: flex;
    flex-direction: column;
}
.fourth .passfield input{
    padding: 15px;
    font-weight: 500;
    width: 20rem;
    height: 4rem;
    border: 1px solid gray;
    border-radius: 5px;
}
.payButton{
    display: flex;
    background-color: rgb(47, 47, 193);
    color: aliceblue;
    border: 1px solid rgb(47, 47, 193);
    border-radius: 5px;
    width: 35rem;
    justify-content : center;
    align-items: center;
    height: 5rem;
    margin-bottom: 10px;
}

.right{
    background-color: rgb(224, 221, 221);
}
.right .layer{
    display: flex;
}
.right span{
    font-size: 12px;
    margin-left: 1rem;
}
</style>