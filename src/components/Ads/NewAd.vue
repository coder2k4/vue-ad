<template>
    <!--  .container  -->
    <v-container>
        <!--  .row      -->
        <v-layout row>
            <!--  .col-xs-12          -->
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                            name="description"
                            label="Ad description"
                            type="text"
                            v-model="description"
                            :rules="[v => !!v || 'Description is required']"
                    ></v-textarea>
                </v-form>
                <v-layout row class="mb-3">
                    <v-flex xs12>
                        <v-btn class="warning" @click="loadFile" :loading="loading">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input type="file" ref="fileinput" style="display: none" @change="loadingFile" accept="image/*">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img :src="imageSrc" height="100" alt="Loaded image" v-if="imageSrc">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                                label="Add to promo?"
                                v-model="promo"
                                color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="!valid || !image || loading"
                                class="success"
                                @click="createAd"
                        >
                            Create ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        name: "NewAd",
        data() {
            return {
                title: '',
                description: '',
                promo: false,
                valid: false,
                image: null,
                imageSrc: ''
            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate() && this.imageSrc) {
                    // logic
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    }
                    this.$store.dispatch('createAd', ad)
                        .then(() => this.$router.push('/'))
                        .catch(() => {

                        })
                }
            },
            loadFile() {
                this.$refs.fileinput.click()
            },
            loadingFile(event) {
                const file = event.target.files[0];
                const readedFile = new FileReader();
                readedFile.readAsDataURL(file);
                readedFile.onload =  () => {
                    this.imageSrc = readedFile.result;
                };
                this.image = file;

            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>