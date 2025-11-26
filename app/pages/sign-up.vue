<template>
  <div class="signup">
    <div class="signup__auth">
      <h2 class="signup__auth-title">Create a new account</h2>
      <p class="signup__auth-subtitle">Enter your details to sign up</p>

      <form @submit.prevent="onSubmit">
        <div class="signup__auth-group">
          <label class="signup__auth-label">Email</label>
          <input v-model="form.email" type="email" placeholder="m@example.com" class="signup__auth-input" />
          <p v-if="errors.email" class="signup__auth-error">{{ errors.email }}</p>
        </div>

        <div class="signup__auth-group">
          <label class="signup__auth-label">Password</label>
          <input v-model="form.password" type="password" class="signup__auth-input" placeholder="Password"/>
          <p v-if="errors.password" class="signup__auth-error">{{ errors.password }}</p>
        </div>

        <div class="signup__auth-group">
          <label class="signup__auth-label">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" class="signup__auth-input" placeholder="Confirm Password"/>
          <p v-if="errors.confirmPassword" class="signup__auth-error">{{ errors.confirmPassword }}</p>
        </div>

        <button type="submit" class="signup__auth-btn signup__auth-btn--primary">Create Account</button>
      </form>

      <p v-if="serverError" class="signup__auth-error">{{ serverError }}</p>
      <p v-if="successMessage" class="signup__auth-success">{{ successMessage }}</p>

      <p class="signup__auth-switch">
        Already have an account? <NuxtLink to="/sign-in">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ 
  layout: 'default' 
})

import { HandleSignUp } from '~~/lib/api';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { z } from 'zod';

const router = useRouter()

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6)
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  })

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  email: null as string | null,
  password: null as string | null,
  confirmPassword: null as string | null
})

const serverError = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const onSubmit = async () => {
  serverError.value = null
  successMessage.value = null

  errors.email = null
  errors.password = null
  errors.confirmPassword = null

  
  const result = registerSchema.safeParse(form)

  if (!result.success) {
    result.error.issues.forEach(issue => {
      const field = issue.path[0]
      if (
        field === "email" ||
        field === "password" ||
        field === "confirmPassword"
      ) {
        errors[field] = issue.message
      }
    })
    return
  }

  const payload = {
    email: form.email,
    password: form.password,
    name: form.email.split("@")[0] as string
  }

  const res = await HandleSignUp(payload)

  if (!res.success) {
    serverError.value = res.error
    return
  }

  successMessage.value = "Redirecting..."
  
  setTimeout(() => {
    router.push("/home")
  }, 1500)
}
</script>