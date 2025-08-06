<template>
	<v-app>
		<Navbar />
		<v-main>
			<slot />
		</v-main>
		<Footer />
	</v-app>
</template>
<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
export default {
	name: 'DefaultLayout',
	components: {
		Navbar,
		Footer
	}
}
</script>
