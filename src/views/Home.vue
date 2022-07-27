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
        <td>
          <Feedbacks></Feedbacks>
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
import Feedbacks from '../components/Feedbacks.vue';

@Options({
  components: {
    HelloWorld,
    websites,
    UserInfo,
    Feedbacks
  },
})
export default class Home extends Vue {}
</script>

<style>
.home {
  width: 100%;
}
</style>
