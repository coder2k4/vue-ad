<template>
    <!--  .container  -->
    <v-container>
        <!--  .row      -->
        <v-layout row>
            <!--  .col-xs-12          -->
            <v-flex xs12>
                <h1 class="text--secondary mb-3">Ad</h1>
                <v-card :key="adById.id">
                    <v-img :src="adById.imageSrc" height="300"></v-img>
                    <v-card-title primary-title><h1 class="headline">{{adById.title}}</h1></v-card-title>
                    <v-card-text>{{adById.description}}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <edit-pop-up :ad="adById" v-if="isOwner"></edit-pop-up>
                        <app-buy-modal :ad="adById"></app-buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import EditPopUp from "./EditPopUp";

    export default {
        name: "Ad",
        props: ['id'],
        computed: {
            adById: function () {
                return this.$store.getters.adById(this.id)
            },
            isOwner(){
                return this.adById.id === this.$store.getters.user.id;
            }

        },
        components: {
            EditPopUp
        }
    }
</script>

<style scoped>

</style>