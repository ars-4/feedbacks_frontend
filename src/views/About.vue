<template>
  <div class="about">
    <h1>Full Documentation<br>Coming Soon</h1>
    <p>Simple create account or login to existed one,<br> Add New Website on the <a href="/">Home</a> page<br> and then copy this code in your website's page</p>
    <div class="code">
      <br>
      <button class="btn btn-primary" @click="copy_code">{{ copy_status }}</button>
      <br>
      <br>
      <pre id="code">

        &lt;div id="myForm"&gt;&lt;/div&gt;
        &lt;script type="text/javascript"&gt;
          const url = "https://feedbacks-backend.herokuapp.com/api/feedbacks/";
          const myElement = document.getElementById('myForm');
          let nameInput = document.createElement('input');
          let emailInput = document.createElement('input');
          let feedbackInput = document.createElement('input');
          let submitBtn = document.createElement('button');
          myElement.appendChild(nameInput);
          myElement.appendChild(emailInput);
          myElement.appendChild(feedbackInput);
          myElement.appendChild(submitBtn);
          const myFeedbackSubmitFunction = () => {
            let body = {
              "name": nameInput.value,
              "email": emailInput.value,
              "feedback": feedbackInput.value,
              "website_name": "Ars-7"
            }
            fetch(url, {
              method: "POST",
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json; charset=utf8'
              },
              body: JSON.stringify(body)
            }).then(response => {return response.json()}).then(data => {
              if(data['error']) {
                if(data['error'] == 'true') {
                  throw new Error("An Unexpected error occurred");
                }
                else {
                  console.log("Successfully sent your feedback");
                }
              }
            }).catch(error => { throw new Error(error) })
          }
          submitBtn.addEventListener('click', myFeedbackSubmitFunction());
        &lt;/script&gt;

      </pre>
    </div>
    <br>
    <hr>
    <p>You can also download <a href="#">this script</a> and then<br> include in your site in the end and call the Constructor like below</p>
    <div class="code">
      <pre>
        &lt;div id="myform"&gt;&lt;/div&gt;
        &lt;script src="path/to/downloaded/script/feedbacks.js"&gt;&lt;/script&gt;
        &lt;script&gt;
          const myForm = new FeedbackForm(
            // Elements ID in which you wanted to append form element to
            "myform",

            // Name of the website you added here -> CASE_SENSITIVE=True
            "website",

            // Hex code or color name you want to apply -> DEFAULT=#42b983&nbsp;<span class="color"></span>
            "#f44336" 
          );
        &lt;/script&gt;
      </pre>
    </div>
    <br>
    <p>It will look like the Image below:</p>
    <img src="../assets/formImage.jpg" width="auto">
    <br>
    <p>You can also customize it by overriding the styles<br> via <b><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/important">'!important'</a></b> keyword in css</p>
    <p>You can also just send the <b>Email</b> as all fields have defaults provided</p>
    <hr>
    <br>
  </div>
</template>

<script>
  import {Vue, Options} from 'vue-class-component';

  @Options({

    data() {
      return {
        copy_status: "Copy To Clipboard",
        the_real_code: ""
      }
    },

    methods: {

      reset_copy_status: function() {
        this.copy_status = "Copy To Clipboard"
      },

      copy_code: function() {
        this.copy_status = "Code Copied!"
      }

    }

  })

  export default class About extends Vue {}

</script>

<style>
  .about {
    padding: 20px;
    margin-left: 25%;
    margin-right: 25%;
    background: rgba(0, 0, 0, 0.8)
  }
  .about .code {
    text-align: left;
    padding: 20px;
    backdrop-filter: blur(5px);
    background-color: rgba(24, 56, 100, 0.5);
    border-radius: 4px;
  }
  .about .code .btn {
    float: right;
  }
  .about p a {
    color: #42b983;
  }
  .color {
    padding-left: 5px;
    padding-right: 8px;
    color: #42b983;
    background-color: #42b983;
  }
</style>
