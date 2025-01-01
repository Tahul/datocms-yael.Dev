<script setup lang="ts">
import { useAnimate } from 'motion-v'

withDefaults(
  defineProps<{
    color?: string
    light?: boolean
  }>(),
  { color: 'red' },
)

const surfaceRef = ref<HTMLElement>()
const targetRef = ref<HTMLElement>()

const [scope, animate] = useAnimate()

useFollowPointer(surfaceRef, targetRef)

function onMouseOver() {
  animate(
    '.bg',
    {
      opacity: 0.5,
      scale: 1.005,
    },
    {
      damping: 25,
      stiffness: 800,
      type: 'spring',
    },
  )
}

function onMouseLeave() {
  animate(
    '.bg',
    {
      opacity: 0.25,
      scale: 1,
    },
    {
      damping: 25,
      stiffness: 800,
      type: 'spring',
    },
  )
}
</script>

<template>
  <div
    ref="scope"
    class="group"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div
      class="relative w-full h-full p-2"
    >
      <div
        class="bg absolute left-0 top-0 rounded-lg size-full -z-10 opacity-25"
        :class="{
          'gradient-texture-light': light,
          'gradient-texture': !light,
        }"
      />

      <div
        ref="targetRef"
        class="absolute -z-20"
        :style="{
          left: 0,
          top: 0,
          width: '0px',
          height: '0px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
          opacity: 0.5,
        }"
      />

      <UCard
        class="w-full h-full"
      >
        <template
          v-if="$slots.header"
          #header
        >
          <slot
            name="header"
          />
        </template>

        <slot />

        <template
          v-if="$slots.footer"
          #footer
        >
          <slot name="footer" />
        </template>
      </UCard>
    </div>
  </div>
</template>
