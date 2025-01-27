<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store'

const useUser = useUserStore()
const { user } = storeToRefs(useUser)

</script>

<template>
	<div>
		<h3 class="text-2xl font-semibold text-blue-500">
			Welcome: {{ user === null ? 'No name' : user.email }}
		</h3>
	</div>
</template>
