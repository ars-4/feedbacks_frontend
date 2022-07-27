<template>
    <div class="feedbacks">
        <h2>Feedbacks List</h2>
        <input v-model="websitename" placeholder="website name">
        <br>
        <button class="btn btn-primary" @click="get_feedbacks">Search</button>
        <br>
        <div class="feedbackscard" v-for="obj in feedbacks_list">
            <p>{{ obj.name }}</p>
            <p>{{ obj.email }}</p>
            <p>{{ obj.feedback }}</p>
            <p>{{ obj.website_name }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';

    @Options({
        data() {
            return {
                feedbacks_list: [],
                websitename: ""
            }
        },

        methods: {

            refresh_user_token: function() {
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
                ).then(response=>{return response.json()}).then(data=>{
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('access');
                    localStorage.setItem('access', data['access']);
                    localStorage.setItem('refresh', data['access']);
                    console.log("Successfully Changed Refresh Token");
                }).catch(error => {
                    throw new Error(error);
                })
            }, // refresh_user_token

            get_feedbacks: function() {
                let tempo = this.websitename;
                this.feedbacks_list = []
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
                }).then(response=>{return response.json()}).then(data=>{
                    if(data['code']) {
                        this.refresh_user_token()
                        this.get_feedbacks()
                    }
                    else {
                        let Obj = {
                            name: "",
                            email: "",
                            feedback: ""
                        }
                        for(let i=0; i< data.length; i++) {
                            this.feedbacks_list.push(Obj)
                            Obj.name = data[i]['name']
                            Obj.email = data[i]['email']
                            Obj.feedback = data[i]['feedback']
                            console.log(Obj)
                        }
                        console.log(data)
                    }
                }).catch(error=>{throw new Error(error)})
            } // get_feedbacks

        }, // methods

        // beforeMount() {
        //     this.get_feedbacks()
        // }

    })

    export default class Feedbacks extends Vue {}
</script>

<style>
.feedbacks {
    border-left: 2px solid #c3c3c3;
    padding: 10px;
    margin-top: -20%;
}
.feedbackscard {
    background: rgba(255, 255, 255, 0.5);
    color: #000;
    padding: 5px;
    margin-bottom: 1%;
    border-radius: 4px;
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