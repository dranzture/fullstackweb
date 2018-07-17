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
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    color="red darken-2"
                                    placeholder="Password"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="getEmailAndPassword" class="white--text" color="red darken-2">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container> 
    </v-content>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    getEmailAndPassword() {
      console.log(this.email + " " + this.password);
    }
  }
};
</script>
    
<style>
div {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
