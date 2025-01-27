<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { storeToRefs } from 'pinia';

const router = useRouter()
const useUser = useUserStore()
const { user } = storeToRefs(useUser)
const { logoutUser } = useUser

const handledLogout = async () => {
	try {
		const resp = await logoutUser()
		if (resp.email === null) return router.push('/login')
	} catch (error) {

	}
}

</script>

<template>
	<nav class="bg-gray-50 shadow-md">
		<div class="container mx-auto px-4 py-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<img src="/vite.svg" class="logo h-8" alt="Vite logo" />
				</div>
				<button class="lg:hidden text-gray-500 focus:outline-none" type="button"
					data-bs-target="#navbarSupportedContent">
				</button>
				<div class="hidden lg:flex space-x-4" id="navbarSupportedContent">
					<ul class="flex space-x-4">
						<li v-if="user != null">
							<RouterLink class="text-gray-800 hover:text-blue-600" to="/">Auth</RouterLink>
						</li>
						<li v-if="user == null">
							<RouterLink class="text-gray-800 hover:text-blue-600" to="/login">Login</RouterLink>
						</li>
						<li v-if="user != null">
							<RouterLink class="text-gray-800 hover:text-blue-600" to="/perfil">Perfil</RouterLink>
						</li>
						<li>
							<RouterLink class="text-gray-800 hover:text-blue-600" to="/register">Register</RouterLink>
						</li>
					</ul>
				</div>
				<form @submit.prevent="handledLogout" v-if="user != null" class="flex items-center space-x-2">
					<input class="form-input px-3 py-2 border rounded-md" type="search" placeholder="Search" aria-label="Search">
					<button class="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" type="submit">Logout</button>
				</form>
			</div>
		</div>
	</nav>
</template>

<style></style>
