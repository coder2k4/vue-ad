<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar color="deep-purple accent-2" dark>
                        <v-toolbar-title>Sign In</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validate>
                            <v-text-field
                                    prepend-icon="person"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                                    color="deep-purple accent-2"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                    counter
                                    :rules="passwordRules"
                                    required
                                    color="deep-purple accent-2"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="passwordconfirm"
                                    label="Password confirm"
                                    type="password"
                                    v-model="passwordconfirm"
                                    counter
                                    :rules="passwordConfirmRules"
                                    required
                                    color="deep-purple accent-2"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="validate" :loading="loading" :disabled="!valid || loading">
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        name: "Registration",
        data() {
            return {
                email: '',
                password: '',
                passwordconfirm: '',
                valid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],

                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Passwords must be equal or more than 6 characters'
                ],

                passwordConfirmRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Passwords must be equal or more than 6 characters',
                    v => v === this.password || 'Passwords must match'
                ]
            }
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('registerUser', user)
                        .then(() => this.$router.push('/'))
                        .catch(()=>{})
                }
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        }
    }
</script>

<style scoped>

</style>