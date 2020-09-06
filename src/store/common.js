export default {
    state: {
        loading: false,
        error: null
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    },
    mutations: {
        setLoading(state, value) {
            state.loading = value
        },
        setError(state, value) {
            state.error = value
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        setLoading({commit}, value) {
            commit('setLoading', value)
        },
        setError({commit}, value) {
            commit('setError', value)
        },
        clearError({commit}) {
            commit('clearError')
        }
    }
}