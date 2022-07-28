<template>
    <table class="WebsitePage">
        <tr>
            <th class="website_info"><h2>Website Information</h2></th>
            <th class="feedbacks_info"><h2>Feedbacks</h2></th>
        </tr>
        <tr>
            <td class="website_info">
                <span>Website Name: {{ web_name }}</span>
                <br><br>
                <span>URL: <a v-bind:href="web_url">{{ web_url }}</a></span>
                <br><br>
                <span>Country: {{ web_country }}</span>
                <br><br>
                <span>Email: <a v-bind:href="'mailto:'+web_email">{{ web_email }}</a></span>
            </td>
            <td class="feedbacks_info">
                <Feedbacks></Feedbacks>
            </td>
        </tr>
    </table>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import Feedbacks from '../components/Feedbacks.vue';
@Options({
    components: {
        Feedbacks
    },
    data() {
        return {
            webid: localStorage.getItem('wid'),
            web_name: "",
            web_url: "",
            web_country: "",
            web_email: ""
        }
    },

    methods: {
        refresh_user_token: function() {
            let refresh = localStorage.getItem('refresh');
            let refresh_url = "https://feedbacks-backend.herokuapp.com/api/auth/refresh/";
            let body = {'refresh': refresh}
            fetch(refresh_url, {method: "POST", body:JSON.stringify(body),headers:{'accept':'application/json', 'Content-Type':'application/json;charset=utf8'}}).then(
                response => {return response.json()}
            ).then(
                data => {
                    localStorage.setItem('refresh', data['refresh'])
                    localStorage.setItem('access', data['access'])
                    console.log('Web_Feed -> Changed')
                }
            )

        },//refresh_user_token

        get_website_info: function () {
            this.webid = localStorage.getItem('wid');
            let access = localStorage.getItem('access');
            let website_api_url = "https://feedbacks-backend.herokuapp.com/api/websites/" + this.webid + "/";
            fetch(website_api_url, {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf8',
                    'Authorization': 'JWT ' + access
                }
            }).then(response => { return response.json() }).then(data => {
                if (data['code']) {
                    async () => {
                        await this.refresh_user_token()
                        this.get_website_info()
                    }
                }
                else {
                    this.web_country = data['country'];
                    this.web_email = data['email'];
                    this.web_name = data['website_name'];
                    this.web_url = data['website_url'];
                }
            })
        }//get_website_info

    },// methods

    beforeMount() {
        this.get_website_info()
    }

})

export default class Web_Feed extends Vue { }
</script>

<style>
    .WebsitePage{
        border:none;
        padding: 20px;
        width: 100%;
    }
    .WebsitePage th, .WebsitePage td {
        border: none;
    }

    .WebsitePage .website_info {
        width: 25%;
        background: rgba(142, 254, 183,0.5);
        padding: 15px;
        border-radius: 4px;
        font-weight: bolder;
    }
    .WebsitePage .feedbacks_info {
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    .WebsitePage a {
        color: #fff;
        text-decoration: none;
    }

</style>