<template>
    <div class="main">
        <div class="Card">
            <h1>You are logging out</h1>
            <button class="btn btn-danger" onclick="">Confirm</button>
            <router-link class="btn btn-primary" to="/Home">Cancel</router-link>
        </div>
    </div>
</template>

<style>
.main {
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
}

.Card {
    background-color: #c3c3c3;
    padding: 20px;
    width: 300px;
    text-align: center;
    border-radius: 4px;
}

.btn {
    border: none;
    margin: 3px;
    padding: 10px;
    text-decoration: none;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}

.btn-primary {
    background-color: #22aaff;
    color: #fff;
}
.btn-danger {
    background: #cc1211;
    color: #fff;
}

</style>