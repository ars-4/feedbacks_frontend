<template>
    <div class="feedbacks">
        <br>
        <div class="feedbackscard" v-for="ele in feedbacks_all_list">
            <p>{{ ele.name }}</p>
            <p><a v-bind:href="'mailto:' + ele.email">{{ ele.email }}</a></p>
            <p>{{ ele.feedback }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    data() {
        return {
            feedbacks_all_list: []
        }
    },

    methods: {

        refresh_user_token: function () {
            let refresh_url = "https://feedbacks-backend.herokuapp.com/api/auth/refresh/";
            let body = {
                'refresh': localStorage.getItem('refresh')
            }
            fetch(
                refresh_url, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(body)
            }
            ).then(response => { return response.json() }).then(data => {
                localStorage.removeItem('refresh');
                localStorage.removeItem('access');
                localStorage.setItem('access', data['access']);
                localStorage.setItem('refresh', data['access']);
                console.log("Feedbacks -> Changed Token");
            }).catch(error => {
                throw new Error("Feedbacks ->" + error);
            })
        }, // refresh_user_token

        get_feedbacks: function () {
            let tempo = localStorage.getItem('wname');
            let feedbacks_url = "https://feedbacks-backend.herokuapp.com/api/feedbacks/?website_name=" + tempo;
            let refresh_token = localStorage.getItem('refresh');
            let access_token = localStorage.getItem('access');
            fetch(feedbacks_url, {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf8',
                    'Authorization': "JWT " + access_token
                }
            }).then(response => { return response.json() }).then(data => {
                if (data['code']) {
                    async () => {
                        await this.refresh_user_token()
                        this.get_feedbacks()
                    }
                }
                else {
                    this.feedbacks_all_list = [];
                    for (let k = 0; k < data.length; k++) {
                        let SObj = {
                            name: data[k]['name'],
                            email: data[k]['email'],
                            feedback: data[k]['feedback']
                        }
                        this.feedbacks_all_list.push(SObj);
                    }
                }
            }).catch(error => { throw new Error('Feedbacks -> ' + error) })
        } // get_feedbacks

    }, // methods

    beforeMount() {
        this.get_feedbacks()
    }

})

export default class Feedbacks extends Vue {
}
</script>

<style>
.feedbacks {
    border-left: 2px solid #c3c3c3;
    padding: 10px;
}

.feedbackscard {
    background: rgba(0, 0, 05, 0.5);
    color: #c3c3c3;
    padding: 5px;
    margin-bottom: 1%;
    border-radius: 4px;
}

.feedbackscard a {
    color: #42b983;
    text-decoration: none;
    font-weight: bolder;
}

input {
    background-color: #fff;
    border: none;
    outline: none;
    padding: 10px;
    margin: 2%;
    border-radius: 4px;
}
</style>