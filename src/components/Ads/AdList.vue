<template>
    <v-container>
        <v-layout row v-if="myAds.length > 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card
                        class="elevation-10 mb-3"
                        v-for="ad in myAds"
                        :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                    :src="ad.imageSrc"
                                    height="160px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="info"
                                        :to="'/ad/' + ad.id"
                                >Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row v-else>
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--secondary mb-3">You have't Ads</h1>
            </v-flex>
        </v-layout>
    </v-container>

</template>


<script>
    export default {
        name: "AdList",
        computed: {
            myAds () { return this.$store.getters.myAds }
        }
    }
</script>

<style scoped>

</style>