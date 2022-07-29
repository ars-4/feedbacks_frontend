<template>
    <div class="websitecreate">
        <div class="Card">
            <h2>Add Website Info</h2>
            <hr>
            <div class="Card-Body">
                <input class="formfield" type="text" v-model="website_name" placeholder="Website Name">
                <br>
                <input class="formfield" type="text" v-model="website_url" placeholder="Website Url">
                <br>
                <input class="formfield" type="text" v-model="email" placeholder="Website Email">
                <br>
                <input class="formfield" type="text" v-model="phone" placeholder="Website Phone">
                <br>
                <input class="formfield" type="text" v-model="country" placeholder="Website Country">
                <br>
                <br>
                <button class="btn btn-primary" @click="add_website">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
@Options({
    data() {
        return {
            website_name: "",
            website_url: "",
            email: "",
            phone: "",
            country: ""
        }
    }, //data

    methods: {

        refresh_user_token: async () => {
            let refresh_url = "https://feedbacks-backend.herokuapp.com/api/auth/refresh/";
            let refresh_token = localStorage.getItem('refresh');
            let body = {
                "refresh": refresh_token,
            }
            fetch(refresh_url, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': "application/json; charset=utf8",
                },
                body: JSON.stringify(body),
            }).then(response => {
                return response.json()
            }).then(data => {
                localStorage.removeItem('refresh');
                localStorage.setItem('refresh', data['refresh']);
                localStorage.removeItem('access');
                localStorage.setItem('access', data['access']);
                console.log("Create Website -> Changed Token");
            }).then(
                () => {
                    setTimeout(() => {
                        this.refresh_user_token
                    }, 3000)
                }
            ).catch(error => {
                console.error('Create Websites -> ' + error)
            })
        },

        add_website: function () {

            let send_url = "https://feedbacks-backend.herokuapp.com/api/websites/";
            let access_token = localStorage.getItem('access');
            let body = {
                "username": localStorage.getItem('userusername'),
                "website_url": this.website_url,
                "website_name": this.website_name,
                "email": this.email,
                "phone": this.phone,
                "country": this.country
            }

            try {
                fetch(send_url, {
                    method: "POST",
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf8',
                        'Authorization': 'JWT ' + access_token
                    },
                    body: JSON.stringify(body)
                }).then(response => { return response.json() }).then(data => {
                    if (data['error']) {
                        if (data['error'] == 'false') {
                            this.$router.push('/')
                        }
                        else {
                            throw new Error("Website Create -> An Unexpected Error Occured")
                        }
                    }
                    else {
                        throw new Error("Website Create -> An Unexpected Error Occured")
                    }
                }).catch(error => { throw new Error('WebsiteCreate -> ' + error) })
            } // try

            catch (error) {
                throw new Error('WebsiteCreate -> ' + error)
            } //catch

        } // add_website

    },//methods

    beforeMount() {
        this.refresh_user_token()
    }
})
export default class Create extends Vue { }
</script>

<style>

    .websitecreate {
        margin-left: 25%;
        margin-right: 25%;
        width: 50%;
    }

    .websitecreate .Card {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        padding: 20px;
        border-radius: 4px;
    }

    .websitecreate .Card .Card-Body input {
        margin: 4px;
        border: none;
        outline: none;
        background-color: #fff;
        border-radius: 4px;
        padding: 15px;
    }

</style>