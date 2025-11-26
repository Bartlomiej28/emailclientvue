<script setup lang="ts">
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { HandleSignIn } from '~~/lib/api'

const router = useRouter()

const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters long.")
})

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: null as string | null, password: null as string | null })
const serverError = ref<string | null>(null)

const onSubmit = async () => {
  serverError.value = null
  errors.email = null
  errors.password = null

  const result = loginSchema.safeParse(form)
  if (!result.success) {
    result.error.issues.forEach(issue => {
      const field = issue.path[0] as 'email' | 'password'
      errors[field] = issue.message
    })
    return
  }

  const res = await HandleSignIn({ 
      email: form.email, 
      password: form.password 
  })

  if (res.success) {
    console.log(res.account)
    
  }else{
    serverError.value = res.error
    return
  }
  
  router.push('/home')
}
</script>

<template>
  <div class="signin">
    <div class="signin__auth">
      <h2 class="signin__auth-title">Login to your account</h2>
      <p class="signin__auth-subtitle">Enter your email below to login</p>

      <form @submit.prevent="onSubmit" class="auth__form">
        <div class="signin__auth-group">
          <label class="signin__auth-label">Email</label>
          <input v-model="form.email" type="email" class="signin__auth-input" placeholder="Email"/>
          <p v-if="errors.email" class="signin__auth-error">{{ errors.email }}</p>
        </div>

        <div class="signin__auth-group">
          <label class="signin__auth-label">Password</label>
          <input v-model="form.password" type="password" class="signin__auth-input" placeholder="Password"/>
          <p v-if="errors.password" class="signin__auth-error">{{ errors.password }}</p>
        </div>

        <button type="submit" class="signin__auth-btn signin__auth-btn--primary">Login</button>
      </form>

      <p v-if="serverError" class="signin__auth-error">{{ serverError }}</p>
      <p class="signin__auth-switch">
        Don't have an account? <NuxtLink to="/sign-up">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>
