import { ref, computed } from 'vue'

const query = gql`
    query getRockets {
        rockets {
            id
            name
            description
            first_flight
            diameter {
                meters
            }
            height {
                meters
            }
            mass {
                kg
            }
            stages
        }
    }
`

export function useRockets() {
    const { data } = useAsyncQuery<{
        rockets: {
            id: string
            name: string
            description: string
            first_flight: string
            diameter: {
				meters: number
			} | null
            height: {
				meters: number
			} | null
            mass: {
				kg: number
			} | null
            stages: number
        }[]
    }>(query)

    const rockets = computed(() => data.value?.rockets ?? [])

    type Rocket = {
        id: string
        name: string
        description: string
        first_flight: string
        diameter: { meters: number } | null
        height: { meters: number } | null
        mass: { kg: number } | null
        stages: number
    }

    const selectedRocket = ref<Rocket | null>(null)    
    return {
        rockets,
        selectedRocket
    }
}
