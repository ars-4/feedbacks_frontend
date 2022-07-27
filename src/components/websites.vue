<template>
    <div class="websites">
        <table>
            <tr>
                <td>
                    <h3>Your websites</h3>
                </td>
                <td>
                    <button class="btn btn-primary right" @click="fetch_websites">Get Websites</button>
                </td>
            </tr>
        </table>
        <table class="wtable">
            <tr class="wtr">
                <th class="wname">Website Name</th>
                <th class="wemail">Website Email</th>
                <th class="wurl">Website Url</th>
            </tr>
            <tr class="tr" v-for="ele in websites_country">
                <td class="wname" v-html="ele.name"></td>
                <td class="wemail" v-html="ele.email"></td>
                <td class="wurl"><a href="{{ ele.url }}" v-html="ele.url"></a></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

@Options({
    data() {
        return {
            websites_country: []
        }
    },

    methods: {
        refresh_user_token: () => {
            let refresh_url = "https://feedbacks-backend.herokuapp.com/api/auth/refresh/"
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
                console.log("Changed");
            }).then(
                // () => {
                //     setTimeout(this.fetch_websites(), 6000)
                // }
            ).catch(error => {
                console.error(error)
            })
        },
        fetch_websites: function () {
            let url = "https://feedbacks-backend.herokuapp.com/api/websites/"
            let access_token = localStorage.getItem('access');
            fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json; charset=utf8",
                    "Authorization": "JWT " + access_token,
                },
            }).then(
                response => { return response.json() }
            ).then(data => {
                if (data['code']) {
                    console.log("Token Invalid")
                    this.refresh_user_token()
                }
                else {
                    this.websites_country = [];
                    let Obj = {
                        name: "",
                        email: "",
                        url: ""
                    }
                    for (let i = 0; i <= data.length; i++) {
                        let email = data[i]['email'];
                        let website_name = data[i]['website_name'];
                        let website_url = data[i]['website_url'];
                        Obj.name = website_name
                        Obj.email = email
                        Obj.url = website_url
                        this.websites_country.push(Obj);
                    }
                }
            }).catch(error => {
                console.error(error)
                this.refresh_user_token
            })
        }// FUNCTION

    }, // METHODS

    beforeMount() {
        this.fetch_websites();
    }

}) // OPTIONS

export default class websites extends Vue { }

</script>

<style>
.websites {
    padding: 20px;
    margin: 3%;
}
.websites h3 {
    text-align: left;
}


.wtable {
    border: 3px solid #242424;
    background: rgba(200, 200, 200, 0.5);
    backdrop-filter: blur(5px);
}

th,
.wemail, .wname, .wurl {
    border: 3px solid #242424;
}

.wname {
    width: 100px;
}

.wemail,
.wurl {
    width: 250px;
}
.wurl a {
    color: #42b983;
    font-weight: bolder;
    text-decoration: none;
}
</style>