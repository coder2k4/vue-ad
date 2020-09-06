<template>
    <v-app>
        <template v-if="error">
            <v-snackbar
                    :multi-line="true"
                    :timeout="16000"
                    color="error"
                    :value="true"
                    @input="closeError"
            >
                {{ error }}
                <v-btn
                        flat
                        dark
                        @click="closeError"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </template>
        <v-navigation-drawer app temporary v-model="drawer">
            <v-list>
                <v-list-tile @click="" v-for="link of links" :key="link.title" :to="link.url">
                    <v-list-tile-action>
                        <v-icon color="deep-purple accent-2">{{link.icon}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onLogout" v-if="isUserLoggedIn">
                    <v-list-tile-action>
                        <v-icon color="deep-purple accent-2">exit_to_app</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Log Out'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="deep-purple accent-2" dark>
            <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link flat to="/" tag="span" style="cursor: pointer">Vue SPA application</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-for="link of links" :to="link.url">
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.title}}
                </v-btn>
                <v-btn flat @click="onLogout" v-if="isUserLoggedIn">
                    <v-icon left>exit_to_app</v-icon>
                    Log Out
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-content v-if="loading">
            <v-progress-linear :indeterminate="true" ></v-progress-linear>
        </v-content>
        <v-content v-else>
            <router-view></router-view>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.$store.getters.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
          { title: 'New ad', icon: 'note_add', url: '/new' },
          { title: 'My ads', icon: 'lock', url: '/list' }
        ]
      } else {
        return [
          { title: 'Login', icon: 'lock', url: '/login' },
          { title: 'Registration', icon: 'face', url: '/registration' }
        ]
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  }

}
</script>
