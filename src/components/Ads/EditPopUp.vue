<template>
    <v-dialog
            v-model="dialog"
            width="500"
            persistent
    >
        <template v-slot:activator="{ on }" >
            <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"

            >
                EDIT
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <span class="headline">Edit AD</span>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="newTitle"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                            name="description"
                            label="Ad description"
                            type="text"
                            v-model="newDescription"
                            :rules="[v => !!v || 'Description is required']"
                    ></v-textarea>
                </v-form>
                <v-flex xs12>
                    <v-switch
                            label="Add to promo?"
                            v-model="newPromo"
                            color="primary"
                    ></v-switch>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed class="normal" flat @click="cancelOrder">Close</v-btn>
                <v-btn depressed class="primary" dark flat @click="saveOrder" :disabled="!valid || loading">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'EditPopUp',
  props: ['ad'],
  data: () => ({
    dialog: false,
    valid: false,
    newTitle: '',
    newDescription: '',
    newPromo: ''
  }),
  methods: {
    saveOrder () {
      if (this.$refs.form.validate()) {
        // logic
        const editedAd = {
          id: this.ad.id,
          title: this.newTitle,
          description: this.newDescription,
          promo: this.newPromo
        }
        this.$store.dispatch('updateEditedAd', editedAd)
          .then(() => this.$router.push('/'))
          .catch(() => {

          })
      }
      this.dialog = false
    },
    cancelOrder () {
      this.dialog = false
      this.newTitle = this.ad.title
      this.newDescription = this.ad.description
      this.newPromo = this.ad.promo
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    this.cancelOrder()
  }

}
</script>

<style scoped>

</style>
