<template>
  <div>
    <v-content>       
        <v-container fluid fill-height>    
            <v-layout  align-center justify-center>               
                <v-flex xs12 sm8 md4>                    
                    <v-card class="elevation-12">
                        <v-toolbar dark color="red darken-2">
                            <v-toolbar-title class="white--text">Detail Masters Inc. Login</v-toolbar-title>   
                        </v-toolbar>     
                        <v-card-text>        
                            <v-form >
                                <v-text-field
                                    v-model="email"
                                    label="Email"
                                    placeholder="Email"
                                    color="red darken-2"
                                    @input="reset"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    color="red darken-2"
                                    placeholder="Password"
                                    type="password"
                                    @input="reset"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submitClick" class="white--text" color="red darken-2">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                    <app-alert :authentication="auth"></app-alert>
                </v-flex>
            </v-layout>
        </v-container> 
    </v-content>

  </div>
</template>

<script>
import Alert from "./AlertComponent.vue";
export default {
  components: {
    "app-alert": Alert
  },
  data() {
    return {
      auth: '',
      email: '',
      password: '',
      token: ''
    };
  },
  methods: {
    reset(){
        this.auth = false;
    },
    getEmailAndPassword() {
      console.log(this.email + " " + this.password);
    },
    submitClick() {
      console.log(this.email + " " + this.password);
      if (this.email === "" || this.password === "") {
        this.auth = true;
      }
      this.$http
        .post("https://localhost:3000/user/login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          if (result.data.token != null) {
            this.token = result.data.token;
            console.log(this.token);
          } else {
            this.auth = true;
          }
        });
    }
  }
};
</script>
    
<style>
div {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
