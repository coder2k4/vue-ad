import * as firebase from 'firebase'

class Order {
    constructor(name, email, adID, done = false, ownerId = null) {
        this.name = name
        this.email = email
        this.adID = adID
        this.id = ownerId
        this.done = done
    }
}

export default {
    state: {
        orders: []
    },
    getters: {
        doneOreders(state) {
            return state.orders.filter(o => o.done === true)
        },
        undoneOrders(state){
            return state.orders.filter(o => o.done === false)
        },
        orders (state, getters){
            return getters.undoneOrders.concat(getters.doneOreders)
        }
    },
    mutations: {
        loadOrder(state, order) {
            state.orders = order
        }
    },
    actions: {
        async createOrder({commit}, order) {
            const newOrder = new Order(order.name, order.email, order.adId)
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${order.id}/orders`).push(newOrder)
            } catch (e) {
                commit('setError', e.message)
                throw e
            }
        },
        async fetchOrders({commit, getters}) {
            commit('clearError')
            const fetchedOrders = []

            try {
                const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
                const orders = fbVal.val()

                Object.keys(orders).forEach(key=>
                {
                    const order = orders[key]
                    fetchedOrders.push(new Order(order.name, order.email,order.adID, order.done, key))
                })

                commit('loadOrder', fetchedOrders)
                commit('setLoading', false)
            } catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
                throw e
            }
        },
        async markOrderDone({commit, getters}, orderId)
        {
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).child(orderId).update({
                    done : true
                })
            }
            catch (e) {
                commit('setError', e.message)
                throw e
            }
        }
    }
}
