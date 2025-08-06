<template>
    <v-container>
        <h3 class="my-5">
            <v-icon icon="mdi-rocket-launch" />
            SpaceX Launches
        </h3>
        <v-row>
            <v-col cols="2">
                <v-select v-model="selectedYear" :items="availableYears" label="Filter by Launch Year"
                    variant="outlined" clearable class="mb-5" />
            </v-col>
            <v-col cols="2">
                <v-btn-toggle v-model="sortOrder" divided>
                    <v-btn value="asc">Oldest First</v-btn>
                    <v-btn value="desc">Newest First</v-btn>
                </v-btn-toggle>

            </v-col>
        </v-row>

        <p>There are {{ sortedLaunches?.length || 0 }} launches.</p>

        <ClientOnly>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Mission Name</th>
                        <th class="text-left">Launch Date</th>
                        <th class="text-left">Launch Site</th>
                        <th class="text-left">Rocket</th>
                        <th class="text-left">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="launch in sortedLaunches" :key="launch.id">
                        <td>{{ launch.mission_name }}</td>
                        <td>{{ formatDate(launch.launch_date_utc) }}</td>
                        <td>{{ launch.launch_site?.site_name_long }}</td>
                        <td>{{ launch.rocket?.rocket_name }}</td>
                        <td>{{ launch.details || 'N/A' }}</td>
                    </tr>
                </tbody>
            </v-table>
        </ClientOnly>

    </v-container>
</template>

<script lang="ts" setup>
import { useLaunches } from '~/composables/useLaunches';

const {
    selectedYear,
    sortOrder,
    availableYears,
    sortedLaunches,
    formatDate,
} = useLaunches()
</script>
