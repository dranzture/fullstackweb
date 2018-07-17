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
    getUsers() {}
  },
  created() {
    this.$http
      .get("http://localhost:3000/user")
      .then(rows => {
        if (rows.data.count > 0) {
          for (let i = 0; i < rows.data.count; i++) {
            const user = {
              meta: "user_class",
              id: rows.data.data[i].id,
              email: rows.data.data[i].email,
              passcode: rows.data.data[i].passcode,
              firstname: rows.data.data[i].firstname,
              lastname: rows.data.data[i].lastname
            };
            this.users.push(user);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
