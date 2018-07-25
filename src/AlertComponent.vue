<template>
    <div>
        <v-app>
            <v-alert 
            :value="authentication"
            transition="scale-transition"
            color="red"
            >
            Authentication Failed
            </v-alert>
        </v-app>
    </div>
</template>

<script>
export default {
  props: ['authentication']
};
</script>

<style >
div {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
