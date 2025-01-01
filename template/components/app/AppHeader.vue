<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    active: route.path.startsWith('/getting-started'),
    icon: 'i-lucide-book-open',
    label: 'Docs',
    to: '/getting-started',
  },
  {
    active: route.path.startsWith('/components'),
    icon: 'i-lucide-box',
    label: 'Components',
    to: '/components',
  },
  {
    icon: 'i-lucide-map',
    label: 'Roadmap',
    to: '/roadmap',
  },
  {
    icon: 'i-simple-icons-figma',
    label: 'Figma',
    target: '_blank',
    to: 'https://www.figma.com/community/file/1288455405058138934',
  },
  {
    icon: 'i-lucide-rocket',
    label: 'Releases',
    target: '_blank',
    to: 'https://github.com/nuxt/ui/releases',
  },
],
)
</script>

<template>
  <UHeader :ui="{ root: 'border-none' }">
    <template #title>
      <Pressable
        size="xl"
        variant="link"
      >
        yael.dev
      </Pressable>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip
        :kbds="['meta', 'G']"
        text="Open on GitHub"
      >
        <UButton
          aria-label="GitHub"
          color="neutral"
          icon="i-simple-icons-github"
          target="_blank"
          to="https://github.com/nuxt/ui"
          variant="ghost"
        />
      </UTooltip>
    </template>

    <template #content>
      <UNavigationMenu
        class="-mx-2.5"
        :items="items"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
