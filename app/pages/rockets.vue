<template>
    <v-container>
        <h3 class="my-5">
            <v-icon icon="mdi-rocket-launch" />
            SpaceX Rockets
        </h3>
        <v-progress-circular color="black" v-if="!rockets" indeterminate></v-progress-circular>

        <v-row>
            <v-col cols="2">
                <v-select v-model="selectedRocket" :items="rockets" item-title="name" item-value="id"
                    label="Select Rocket" variant="outlined" clearable class="mb-5" return-object />
            </v-col>
        </v-row>

        <!-- {{ selectedRocket }} -->

        <v-container v-if="selectedRocket">
            <v-text-field v-model="selectedRocket.name" label="Rocket Name" variant="outlined"
                width="500"></v-text-field>
            <v-textarea variant="outlined" rows="4" label="Description" width="500"
                v-model="selectedRocket.description"></v-textarea>
            <v-text-field v-model="selectedRocket.first_flight" label="First Flight" variant="outlined"
                width="500"></v-text-field>
            <v-text-field v-if="selectedRocket.diameter" v-model="selectedRocket.diameter.meters"
                label="Diameter (meters)" variant="outlined" :style="{ width: '500px' }" />
            <v-text-field v-if="selectedRocket.height" v-model="selectedRocket.height.meters" label="Height (meters)"
                variant="outlined" width="500"></v-text-field>
            <v-text-field v-if="selectedRocket.mass" v-model="selectedRocket.mass.kg" label="Mass (kg)"
                variant="outlined" width="500"></v-text-field>
            <v-text-field v-model="selectedRocket.stages" label="Stages" variant="outlined" width="500"></v-text-field>
        </v-container>

        <p v-else>Select a rocket to show details</p>
    </v-container>
</template>

<script lang="ts" setup>
const {
    rockets,
    selectedRocket
} = useRockets()
</script>
