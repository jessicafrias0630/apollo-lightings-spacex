export const useFavorites = defineStore('favorites', {
	state: () => ({ rockets: [] as string[] }),
	actions: {
		addFavorite (rocketName: string) {
			if (!this.rockets.includes(rocketName)) {
				this.rockets.push(rocketName)
			}
		},
		clearFavorites () {
			this.rockets = []
		},
	},
})
