<template>
    <div>
        <v-alert
        v-model="auth"
        transition="scale-transition"
        color="error"
        >
        Authentication Failed
        </v-alert>
    </div>
</template>

<script>
export default {
    data(){
        return {
            auth: false
        }
    }
};
</script>

<style>
</style>
