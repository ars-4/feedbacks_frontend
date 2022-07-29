<template>
    <div class="main">
        <div class="Card">
            <h1>You are logging out</h1>
            <button class="btn btn-danger" @click="logout_user">Confirm</button>
            <router-link class="btn btn-primary" to="/">Cancel</router-link>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

@Options({
    methods: {
        logout_user: function () {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('userusername')
            localStorage.removeItem('wid');
            localStorage.removeItem('wname');
            localStorage.setItem('status', 'false')
            this.$router.push('/auth')
        },
        check_user_logout: function () {
            let status = localStorage.getItem('status');
            if (status == 'loggedin') {
                this.$router.push('/logout');
            }
            else {
                this.$router.push('/auth');
            }
        },
    },
    beforeMount() {
        this.check_user_logout()
    }
})

export default class Logout extends Vue { }

</script>

<style>
.main {
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
}

.Card {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 300px;
    text-align: center;
    border-radius: 4px;
    backdrop-filter: blur(5px);
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
    background-color: #42b983;
    color: #fff;
}

.btn-danger {
    background: #cc1211;
    color: #fff;
}
</style>