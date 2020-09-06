<template>
    <div>
        <!--  .container  -->
        <v-container fluid>
            <!--  .row      -->
            <v-layout row>
                <!--  .col-xs-12          -->
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="ad in promoAds"
                                :key="ad.id"
                                :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>


        <v-container grid-list-lg>
            <!--  .row      -->
            <v-layout row wrap>
                <!--  .col-xs-12          -->
                <v-flex xs12 md6 lg4 v-for="ad of ads" :key="ad.id">
                    <v-card>
                        <v-img
                                :src="ad.imageSrc"
                                aspect-ratio="2.75"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ ad.title }}</h3>
                                <div> {{ ad.description }} </div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ad/' + ad.id" >Open</v-btn>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            ads () {
                return this.$store.getters.ads;
            },
            promoAds () {
                return this.$store.getters.promoAds;
            }
        }

    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>