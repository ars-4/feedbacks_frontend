<template>
    <div class="websites">
        <table>
            <tr>
                <td class="heading">
                    <h3>Your websites</h3>
                </td>
                <td>
                    <button class="btn btn-primary right" @click="fetch_websites">Get Websites</button>
                    <button class="btn btn-primary right" @click="add_website">Add New</button>
                </td>
            </tr>
        </table>
        <table class="wtable">
            <tr class="wtr">
                <th class="wname">Website Name</th>
                <th class="wemail">Website Email</th>
                <th class="wurl">Website Url</th>
                <th class="wid">Website Id</th>
            </tr>
            <tr class="tr" v-for="ele in websites_country">
                <td class="wname" v-html="ele.name"></td>
                <td class="wurl"><a v-html="ele.email" v-bind:href="'mailto:' + ele.email"></a></td>
                <td class="wurl"><a v-bind:href="ele.url" v-html="ele.url"></a></td>
                <td class="wview btn-primary" @click="set_website_id(ele.id, ele.name)">View</td>
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
                console.log("websites -> Changed Token");
            }).then(
                // () => {
                //     setTimeout(this.fetch_websites(), 6000)
                // }
            ).catch(error => {
                console.error('websites -> ' + error)
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
                    console.log("websites-> Token Invalid")
                    this.refresh_user_token()
                }
                else {
                    this.websites_country = [];
                    for (let i = 0; i < data.length; i++) {
                        let Obj = {
                            name: data[i]['website_name'],
                            email: data[i]['email'],
                            url: data[i]['website_url'],
                            id: data[i]['id']
                        }
                        this.websites_country.push(Obj);
                    }
                }
            }).catch(error => {
                console.error('websites -> ' + error)
                this.refresh_user_token()
            })
        },// FUNCTION

        set_website_id: function (id: any, name: string) {
            localStorage.setItem('wid', id);
            localStorage.setItem('wname', name);
            this.$router.push('/website');
        },

        add_website: function() {
            this.$router.push('/website/create');
        }

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
    border: 1px solid #fff;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

th,
.wemail,
.wname,
.wurl {
    border: 1px solid #242424;
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