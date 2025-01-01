<script setup lang="ts">
import type { ButtonProps } from '#ui/components/Button.vue'
import { useDebounceFn } from '@vueuse/core'
import { useAnimate } from 'motion-v'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<ButtonProps & { sound?: boolean }>(),
  {
    color: 'neutral',
    sound: true,
    variant: 'subtle',
  },
)

const emit = defineEmits<{
  (e: 'pressed'): void
}>()

const [scope, animate] = useAnimate()

const { play: playClick } = useSound('/sounds/click_7.mp3', {
  playbackRate: 0.63,
  volume: 0.25,
})

const { play: playRelease } = useSound('/sounds/click_8.mp3', {
  playbackRate: 0.63,
  volume: 0.25,
})

function onPressed() {
  emit('pressed')

  // Generate random rotation between -7 and 7 degrees
  const randomRotation = (Math.random() * (props.block ? 14 : 7)) - (props.block ? 7 : 3.5)

  animate(
    '.pressable',
    {
      rotateZ: `${randomRotation}deg`,
      scale: 0.97,
    },
    {
      damping: 25,
      mass: 0.5,
      onPlay: () => onReleasedDebounced(),
      stiffness: 1000,
      type: 'spring',
    },
  )

  if (props.sound) {
    playClick()
  }
}

function onReleased(sound = true) {
  animate(
    '.pressable',
    {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
    },
    {
      damping: 25,
      duration: 0.1,
      stiffness: 1000,
    },
  )

  if (props.sound && sound) {
    playRelease()
  }
}

const onPressedDebounced = useDebounceFn(onPressed, 75)
const onReleasedDebounced = useDebounceFn(onReleased, 75)
</script>

<template>
  <span
    ref="scope"
    :class="{ 'w-full': block }"
  >
    <UButton
      v-bind="props"
      :ui="{
        base: `
        pressable
        disabled:opacity-100
        cursor-pointer
      `,
      }"
      @keydown.enter="onPressedDebounced"
      @mousedown="onPressedDebounced"
      @mouseleave="() => onReleasedDebounced(false)"
      @mouseup="onReleasedDebounced"
      @submit="onPressedDebounced"
    >
      <slot />
    </UButton>
  </span>
</template>
