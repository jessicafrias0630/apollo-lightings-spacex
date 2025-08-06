<template>
    <v-container>
        <h3 class="my-5">
            <v-icon icon="mdi-rocket-launch" />
            SpaceX Favorite Rockets
        </h3>

        <v-list>
            <v-list-item v-for="rocket in favorites.rockets" :key="rocket">
                <v-list-item-title>{{ rocket }}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-btn color="error" @click="favorites.clearFavorites()">Clear Favorites</v-btn>
    </v-container>
</template>

<script lang="ts" setup>
import { useFavorites } from '~/stores/useFavorites';

const favorites = useFavorites()
</script>
