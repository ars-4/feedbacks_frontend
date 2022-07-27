<template>
    <div class="userinfo">
        <h2>Your Information</h2>
        <hr>
        <h3>Username: {{ username }}</h3>
        <h3>Full Name: {{ fullname }}</h3>
        <h3>Email: {{ email }}</h3>
    </div>
</template>

<script lang="ts">

    import {Vue, Options} from 'vue-class-component';

    @Options({
        Data() {
            return {
                username: "",
                fullname: "",
                email: ""
            }
        },
        methods: {
            get_user_info: function() {
                let username = localStorage.getItem('userusername');
                let fullname = localStorage.getItem('userfullname');
                let email = localStorage.getItem('useremail');

                this.username = username;
                this.fullname = fullname;
                this.email = email;
            }
        },

        beforeMount() {
            this.get_user_info()
        }
    })

    export default class UserInfo extends Vue {}

</script>

<style>
    .userinfo {
        margin-left: 1%;
        padding: 10px;
        text-align: left;
        border-right: 2px solid #c3c3c3;
    }
    .userinfo h3 {
        padding: 5px;
    }
</style>