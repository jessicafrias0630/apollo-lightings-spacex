import { ref, computed } from 'vue'

const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

export function useLaunches () {
	const selectedYear = ref<string | null>(null)
	const sortOrder = ref<'asc' | 'desc'>('desc')

	const { data } = useAsyncQuery<{
		launches: {
			id: string
			mission_name: string
			launch_date_utc: string
			launch_site: {
				site_name_long: string
			} | null
			rocket: {
				rocket_name: string
			} | null
			details?: string | null
		}[]
	}>(query)

	const launches = computed(() => data.value?.launches ?? [])

	const availableYears = computed<string[]>(() => {
		const years = new Set<number>()
		for (const launch of launches.value) {
			const year = new Date(launch.launch_date_utc).getFullYear()
			years.add(year)
		}
		return [...years].sort((a, b) => b - a).map(String)
	})

	const filteredLaunches = computed(() => {
		if (!selectedYear.value) return launches.value
		return launches.value.filter(
			l => new Date(l.launch_date_utc).getFullYear().toString() === selectedYear.value,
		)
	})

	const sortedLaunches = computed(() => {
		return [...filteredLaunches.value].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()
			return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
		})
	})

	function formatDate (dateString: string) {
		return new Date(dateString).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const favorites = useFavorites()
	function addToFavorites (rocketName: string) {
		favorites.addFavorite(rocketName)
	}

	// For chart
	const launchesByRocket = computed(() => {
		const countMap: Record<string, number> = {}

		launches.value.forEach(launch => {
			const name = launch.rocket?.rocket_name ?? 'Unknown'
			countMap[name] = (countMap[name] || 0) + 1
		})

		return {
			labels: Object.keys(countMap),
			data: Object.values(countMap),
		}
	})

	return {
		selectedYear,
		sortOrder,
		availableYears,
		sortedLaunches,
		formatDate,
		addToFavorites,
		launchesByRocket
	}
}
