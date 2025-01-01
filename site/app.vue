<script setup lang="ts">
const loading = ref(false)

async function toggleLoading() {
  if (loading.value) {
    return
  }

  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 2000))

  loading.value = false
}
</script>

<template>
  <AppRoot class="h-screen w-screen">
    <UContainer>
      <AppHeader />
    </UContainer>

    <UContainer class="p-4 grid grid-cols-1 gap-4 flex-1 h-full">
      <Surface class="flex flex-col items-center justify-center h-[320px]">
        <Pressable
          :disabled="loading"
          @pressed="toggleLoading"
        >
          <Loadable :loading="loading">
            Save
          </Loadable>
        </Pressable>
      </Surface>

      <Surface
        class="flex flex-col items-center justify-center h-[320px]"
      >
        <template #header>
          <h2>
            Test
          </h2>
        </template>

        <Pressable>
          Test button
        </Pressable>
      </Surface>
    </UContainer>
  </AppRoot>
</template>
