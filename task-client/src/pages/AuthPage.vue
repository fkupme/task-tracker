<template>
	<div class="auth-page">
		<div class="container">
			<auth-form />
		</div>
	</div>
</template>

<script>
import AuthForm from '@/components/Forms/AuthForm.vue';
export default {
	name: 'auth-page',
	components: {
		AuthForm
	}

}
</script>
