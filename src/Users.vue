<template>
  <div>
    <ul>
      <li v-for="user in users">{{user.id}} {{user.email}} {{user.passcode}} {{user.firstname}} {{user.lastname}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    getUsers() {
      console.log("Users");
      console.log(process.env.JWT);
      this.$http
      .get("https://localhost:3000/user", {
        headers: {'Authorization': "Bearer " + process.env.JWT}
      })
      .then(result => {               
        if (result.data.count > 0) {
          for (let i = 0; i < result.data.count; i++) {
            const user = {
              meta: "user_class",
              id: result.data.data[i].id,
              email: result.data.data[i].email,
              passcode: result.data.data[i].passcode,
              firstname: result.data.data[i].firstname,
              lastname: result.data.data[i].lastname
            };
            this.users.push(user);
            console.log(user);
          }
        }
        else{
          console.log('did not connect to db')
        }
      })
      .catch(err => {
        console.log(err);
        if(err.status===401){
          this.$router.push({path:'/'});
        }
      });
    }
  },
  created() {
    this.getUsers()
  }
};
</script>

<style>
</style>
