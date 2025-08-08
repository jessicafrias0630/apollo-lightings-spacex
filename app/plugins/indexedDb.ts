import type { Pinia, PiniaPluginContext } from 'pinia'
import localforage from 'localforage'
import { toRaw } from 'vue'

export default defineNuxtPlugin(() => {
	const persistPlugin = ({ store }: PiniaPluginContext) => {
		const key = `pinia-${store.$id}`

		localforage.getItem(key).then(value => {
			if (value) {
				store.$patch(value as object)
			}
		})

		store.$subscribe((_mutation, state) => {
			localforage.setItem(key, toRaw(state))
		})
	}

	const pinia = usePinia() as Pinia
	pinia.use(persistPlugin)
})
