<template>
    <Login></Login>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Login from '@/components/Login.vue';
@Options({
    components: {
        Login,
    },
})
export default class Auth extends Vue { }
</script>