<script setup lang="ts">
import { useAnimate } from 'motion-v'

const props = defineProps<{
  loading: boolean
}>()

const showDone = ref(false)
const doneTimeout = ref<NodeJS.Timeout>()

const defaultRef = ref<HTMLElement>()
const loadingRef = ref<HTMLElement>()
const doneRef = ref<HTMLElement>()

const [scope, animate] = useAnimate()

onMounted(
  () => {
    watch(
      () => props.loading,
      (loadingVal, oldVal) => {
        // Clear any existing timeout
        if (doneTimeout.value) {
          clearTimeout(doneTimeout.value)
        }

        if (!defaultRef.value || !loadingRef.value || !doneRef.value) {
          return
        }

        if (loadingVal) {
          showDone.value = false
          animate(
            defaultRef.value,
            {
              opacity: 0,
              y: 25,
            },
          )
          animate(
            loadingRef.value,
            {
              opacity: 1,
              y: 0,
            },
          )
          animate(
            doneRef.value,
            {
              opacity: 0,
              rotateY: -25,
              y: -25,
            },
          )
        }
        else {
          if (oldVal) {
            // Show done state briefly
            showDone.value = true
            animate(
              loadingRef.value,
              {
                opacity: 0,
                y: -25,
              },
            )
            animate(
              doneRef.value,
              {
                opacity: 1,
                rotateY: 0,
                y: 0,
              },
            )

            // Set timeout to transition back to default
            doneTimeout.value = setTimeout(() => {
              showDone.value = false

              if (!doneRef.value || !defaultRef.value) {
                return
              }

              animate(
                doneRef.value,
                {
                  opacity: 0,
                  rotateY: -25,
                  y: -25,
                },
              )
              animate(
                defaultRef.value,
                {
                  opacity: 1,
                  y: 0,
                },
              )
            }, 1500)
          }
          else {
            animate(
              loadingRef.value,
              {
                opacity: 0,
                y: -25,
              },
            )
            animate(
              defaultRef.value,
              {
                opacity: 1,
                y: 0,
              },
            )
            animate(
              doneRef.value,
              {
                opacity: 0,
                rotateY: -25,
                y: -25,
              },
            )
          }
        }
      },
      { immediate: true },
    )
  },
)

// Clean up timeout on unmount
onUnmounted(() => {
  if (doneTimeout.value) {
    clearTimeout(doneTimeout.value)
  }
})
</script>

<template>
  <div
    ref="scope"
    class="size-full overflow-hidden"
  >
    <div
      v-show="!loading && !showDone"
      ref="defaultRef"
      class="flex items-center gap-1"
    >
      <UIcon
        class="w-5 h-5"
        name="icon-park:save-one"
      />

      <span>
        <slot />
      </span>
    </div>

    <div
      v-show="loading"
      ref="loadingRef"
      class="flex items-center gap-1"
    >
      <UIcon
        class="animate-spin w-5 h-5"
        name="icon-park:loading-three"
      />

      <span>
        <slot
          v-if="$slots.loading"
          name="loading"
        />

        <span v-else>Loading...</span>
      </span>
    </div>

    <div
      v-show="showDone"
      ref="doneRef"
      class="flex items-center gap-1"
    >
      <UIcon
        class="w-5 h-5"
        name="icon-park:success"
      />

      <slot
        v-if="$slots.done"
        name="done"
      />

      <span v-else>Done!</span>
    </div>
  </div>
</template>
