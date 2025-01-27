<script setup>
defineProps({
	error: String,
});
</script>

<template>
	<div class="bg-red-100 text-red-800 border border-red-300 rounded-md px-4 py-2 mb-4" role="alert">
		{{ error.mensaje }}
	</div>
</template>
