<template>
    <table class="center">
        <tr>
            <td>
                <login></login>
            </td>

            <td>
                <Register></Register>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
@Options({
    components: {
        Login,
        Register
    },
    methods: {
        user_check_login: function() {
            let status = localStorage.getItem('status');
            if(status == 'loggedin') {
                this.$router.push('/')
            }
            else{
                this.$router.push('/auth')
            }
        }
    },
    beforeMount() {
        this.user_check_login()
    }
})
export default class Auth extends Vue { }
</script>

<style>
.center {
    margin-left: 28%;
    margin-right: 25%;
}
</style>