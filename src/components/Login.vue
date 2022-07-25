<template>
    <div class="main" id="example">
        <div class="Card">
            <h1>Welcome back!</h1>
            <div>
                <label for="usernamefield">Username</label>
                <br>
                <div class="formfield">
                    <input type="text" id="usernamefield" v-model="usernamefield">
                    <span></span>
                </div>
                <br><br><br>
                <label for="userpasswordfield">Password</label>
                <br>
                <div class="formfield">
                    <input type="text" id="userpasswordfield">
                    <span></span>
                </div>
                <br>
                <button class="btn btn-primary" @click="login_user">Login</button>
                <a class="btn btn-secondary">Sign up</a>
                <br>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
    data() {
    return {
      usernamefield: "",
    };
  },
    methods: {
        login_user: function () {
            let usernamefield = document.getElementById("username");
            alert(this.usernamefield);
        }
    }
})



export default class Login extends Vue { }

</script>

<style>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.Card {
    background-color: #e3e3e3;
    padding: 20px;
    width: 250px;
    border-radius: 4px;
}

.formfield {
    border: 1px solid #242424;
    padding: 4px;
    border-radius: 4px;
    background-color: #fff;
}

input {
    border: none;
    outline: none;
    background-color: transparent;
}

.btn {
    padding: 10px;
    text-decoration: none;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
}
.btn-primary {
    background: #42b983;
    color: #fff;
}
.btn-secondary {
    background-color: #c3c3c3;
}
</style>