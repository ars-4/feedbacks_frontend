<template>
    <div class="main">
        <div class="Card">
            <h1>Join Us</h1>
            <div>
                <div class="formfield">
                    <input type="text" v-model="usernamefieldR" placeholder="Username">
                    <span></span>
                </div>
                <br>
                <div class="formfield">
                    <input type="text" v-model="userpasswordfieldR" placeholder="Password">
                    <span></span>
                </div>
                <br>
                <div class="formfield">
                    <tr>
                        <td>
                            <input type="text" v-model="userfirstname" Size="10" placeholder="First Name">
                        </td>
                        <td>&nbsp;</td>
                        <td>
                            <input type="text" v-model="userlastname" Size="10" placeholder="Last Name">
                        </td>
                    </tr>
                </div>
                <br>
                <div class="formfield">
                    <input type="text" v-model="useremail" placeholder="Email">
                    <span></span>
                </div>
                <br>
                <button class="btn btn-primary" @click="register_user">SignUp</button>
                <br>
            </div>
            <p><a style="color:green">{{ SuccessR }}</a> <a style="color:red">{{ ErrorR }}</a></p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
    data() {
        return {
            usernamefieldR: "",
            userpasswordfieldR: "",
            userfirstname: "",
            userlastname: "",
            useremail: "",
            SuccessR: "",
            ErrorR: ""
        };
    },
    methods: {
        register_user: function () {
            let url = "https://feedbacks-backend.herokuapp.com/api/auth/register/";
            let body = {
                "username": this.usernamefieldR,
                "password": this.userpasswordfieldR,
                "first_name": this.userfirstname,
                "last_name": this.userlastname,
                "email": this.useremail
            }
            console.log(body)

            fetch(
                url, {
                method: 'POST',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json; charset=utf8"
                },
                body: JSON.stringify(body)
            }
            ).then(
                response => {
                    return response.json()
                }
            ).then(
                data => {
                    if (data['error'] == 'true') {
                        localStorage.setItem('status', 'loggedout');
                        this.ErrorR = data['message'];
                    }
                    else {
                        let innerData = data['data'];
                        localStorage.setItem('userusername', innerData['username']);
                        localStorage.setItem('access', innerData['access']);
                        localStorage.setItem('refresh', innerData['refresh']);
                        localStorage.setItem('userfullname', innerData['first_name'] + innerData['last_name']);
                        localStorage.setItem('useremail', innerData['email']);
                        localStorage.setItem('status', 'loggedin');
                        this.SuccessR = data['message'];
                        setTimeout(this.$router.push('/'), 2000);
                    }
                }
            ).catch(error => {
                console.error(error);
            })
        },


    }
})


export default class Register extends Vue { }

</script>

<style>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.Card {
    padding: 20px;
    width: 250px;
    border-radius: 4px;
}

.formfield {
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