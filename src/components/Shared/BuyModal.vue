<template>
    <v-dialog
            v-model="dialog"
            width="500"
            persistent
    >
        <template v-slot:activator="{ on }" >
            <v-btn
                    class="primary"
                    v-on="on"

            >
                BUY
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <span class="headline">Buy info</span>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            name="name"
                            label="Your name"
                            type="text"
                            v-model="name"
                            required
                            :rules="[v => !!v || 'Title is required',v => v.length >= 3 || 'Name must be more than 3 characters']"
                    ></v-text-field>
                    <v-text-field
                            name="email"
                            label="Your email"
                            type="email"
                            v-model="email"
                            required
                            :rules="[v => !!v || 'Email is required', v => /.+@.+.+/.test(v) || 'E-mail must be valid']"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="normal" flat @click="cancelOrder">Close</v-btn>
                <v-btn depressed class=primary dark flat @click="saveOrder" :disabled="!valid || localLoading" :loading="localLoading">Buy</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'BuyModal',
  props: ['ad'],
  data: () => ({
    dialog: false,
    valid: false,
    name: '',
    email: '',
    localLoading: false
  }),
  methods: {
    saveOrder () {
      if (this.$refs.form.validate()) {
        this.localLoading = true
        // logic
        const editedOrder = {
          name: this.name,
          email: this.email,
          ownerId: this.ad.id,
          adId: this.ad.id
        }
        this.$store.dispatch('createOrder', editedOrder)
          .then(() => {})
          .catch(() => {
          })
          .finally(() => {
            this.cancelOrder()
          })
      }
    },
    cancelOrder () {
      this.localLoading = false
      this.dialog = false
      this.name = ''
      this.email = ''
    }
  },
  created () {
    this.cancelOrder()
  }

}
</script>

<style scoped>

</style>
