<template>
  <div class="home">
    <table>
      <tr>
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

@Options({
  components: {
    HelloWorld,
    websites
  },
})
export default class Home extends Vue {}
</script>
