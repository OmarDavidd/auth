<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import Alert from '../components/Alert.vue'
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = useUserStore();

const { error } = storeToRefs(store)
const { loginUser } = store;


const email = ref('')
const password = ref('')

const isActive = computed(() => {
	if (email.value.length > 4 && password.value.length >= 4) return false;
	return true;
})

const handledSubmit = async () => {
	try {
		const resp = await loginUser(email.value, password.value)
		console.log('to home')
		if (resp.email && resp.uid) {
			console.log('router.push')
			return router.push('/')
		}

		email.value = password.value = ''
	} catch (errores) {
		console.log({ 'ErrorLogin': errores });
	}
}

</script>

<template>
	<div class="flex justify-center items-center min-h-screen">
		<div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
			<h1 class="text-center text-2xl font-semibold text-blue-600">Login</h1>
			<hr class="my-4 border-t-2 border-blue-600">
			<Alert v-if="error" :error="error"></Alert>

			<form @:submit.prevent="handledSubmit" class="space-y-4">
				<div class="relative">
					<input id="email" v-model="email" type="email" required
						class="w-full p-2 pt-6 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
						placeholder=" ">
					<label for="email"
						class="absolute left-2 top-2 text-blue-500 text-sm transition-all duration-300 transform -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-120 peer-focus:-translate-y-3 peer-focus:scale-75">
						Correo Electrónico
					</label>
				</div>
				<div class="relative">
					<input id="password" v-model="password" type="password" required
						class="w-full p-2 pt-6 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
						placeholder=" ">
					<label for="password"
						class="absolute left-2 top-2 text-blue-500 text-sm transition-all duration-300 transform -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75">
						Contraseña
					</label>
				</div>
				<div class="d-grid gap-2">
					<button
						class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
						:disabled="isActive"> Login </button>
				</div>
			</form>
		</div>
	</div>
</template>
