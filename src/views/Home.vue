<template>
  <div class="home">
    <table>
      <tr>
        <td>
          <UserInfo></UserInfo>
        </td>
        <td>
          <websites></websites>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import websites from '@/components/websites.vue'; // @ is an alias to /src
import UserInfo from '@/components/UserInfo.vue';

@Options({
  components: {
    HelloWorld,
    websites,
    UserInfo
  },
  methods: {
    check_user_login: function () {
      let status = localStorage.getItem('status');
      if (status == 'loggedin') {
        this.$router.push('/');
      }
      else {
        this.$router.push('/auth');
      }
    },
    check_user_logout: function () {
      let status = localStorage.getItem('status');
      if (status == 'loggedin') {
        this.$router.push('/logout');
      }
      else {
        this.$router.push('/auth');
      }
    }
  },
  beforeMount() {
    this.check_user_login()
  }
})
export default class Home extends Vue { }
</script>

<style>
.home {
  width: 100%;
}
</style>
