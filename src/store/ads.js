import * as firebase from 'firebase'

class Ad {
  constructor (title, description, ownerId, promo = false, imageSrc = '', id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.promo = promo
    this.imageSrc = imageSrc
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, ad) {
      state.ads.push(ad)
    },
    fetchAds (state, ads) {
      state.ads = ads
    },
    updateEditedAd (state, ad) {
      const editedAd = state.ads.find(ads => ads.id === ad.id)
      editedAd.title = ad.title
      editedAd.description = ad.description
      editedAd.promo = ad.promo
    }
  },
  actions: {
    async createAd ({ commit, getters }, ad) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          ad.title,
          ad.description,
          getters.user.id,
          ad.promo
        )
        const createdAd = await firebase.database().ref('ads').push(newAd)
        const imageExt = ad.image.name.slice(ad.image.name.lastIndexOf('.'))
        const loadImage = await firebase.storage().ref(`ads/${createdAd.key}${imageExt}`).put(ad.image)
        const imageSrc = await loadImage.ref.getDownloadURL()

        await firebase.database().ref('ads').child(createdAd.key).update({
          imageSrc
        })

        commit('createAd', {
          ...newAd,
          imageSrc,
          id: createdAd.key
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        let normalizedAds = []
        const fbAnsw = await firebase.database().ref('ads').once('value')
        const ads = fbAnsw.val()
        Object.keys(ads).forEach(key => {
          normalizedAds.push(new Ad(
            ads[key].title,
            ads[key].description,
            ads[key].id,
            ads[key].promo,
            ads[key].imageSrc,
            key
          ))
        })
        commit('fetchAds', normalizedAds)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async updateEditedAd ({ commit }, ad) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('ads').child(ad.id).update({
          title: ad.title,
          description: ad.description,
          promo: ad.promo
        })
        commit('updateEditedAd', ad)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.id === getters.user.id
      })
    },
    adById (state) {
      return adId => state.ads.find(ad => ad.id === adId)
    }
  }
}
