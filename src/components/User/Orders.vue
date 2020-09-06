<template>
    <!--  .container  -->
    <v-container>
        <!--  .row      -->
        <v-layout row>
            <!--  .col-xs-12          -->
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary" mb-4>Orders</h1>
                <v-list
                        subheader
                        two-line
                        v-for="order of orders"
                        :key="order.adID"
                >
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-checkbox color="deep-purple accent-2"
                                        :input-value="order.done"
                                        @click="markDone(order)"
                            ></v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{order.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{order.email}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn
                                    :to="'/ad/' + order.adID"
                                    class="primary"
                                    color="deep-purple accent-2"
                            >Open
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Orders',
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
    }
  },
  computed: {
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }

}
</script>

<style scoped>

</style>
