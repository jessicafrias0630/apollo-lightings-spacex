<template>
	<v-container class="w-75 text-center">
		<!-- {{ launchesByRocket }} -->
		<canvas id="myChart"></canvas>
	</v-container>
</template>

<script setup>
const { launchesByRocket } = useLaunches()

onMounted(() => {
	const ctx = document.getElementById('myChart');

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: launchesByRocket.value.labels,
			datasets: [{
				label: 'Number of Launches',
				data: launchesByRocket.value.data,
				backgroundColor: ['#2196f3', '#4caf50', '#ff9800']
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Launches by Rocket'
				}
			}
		}
	});
});
</script>
