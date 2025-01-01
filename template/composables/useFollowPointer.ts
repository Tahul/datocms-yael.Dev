import { useAnimate } from 'motion-v'
import { onMounted, onUnmounted } from 'vue'

export function useFollowPointer(
  elementRef: Ref<any>,
  targetRef: Ref<any>,
) {
  const [scope, animate] = useAnimate()

  scope.value = elementRef.value

  const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
    const element = elementRef?.value?.$el || elementRef?.value
    const target = targetRef?.value?.$el || targetRef?.value

    if (!element || !target) {
      return
    }

    requestAnimationFrame(() => {
      animate(
        target,
        {
          x: clientX - element.offsetLeft - target.offsetWidth / 2,
          y: clientY - element.offsetTop - target.offsetHeight / 2,
        },
        {},
      )
    })
  }

  const handlePointerLeave = () => {
    const element = elementRef?.value?.$el || elementRef?.value
    const target = targetRef?.value?.$el || targetRef?.value

    if (!element || !target) {
      return
    }

    requestAnimationFrame(() => {
      animate(
        target,
        {
          x: element.offsetWidth / 2 - target.offsetWidth / 2,
          y: element.offsetHeight / 2 - target.offsetHeight / 2,
        },
      )
    })
  }

  onMounted(() => {
    const element = elementRef?.value?.$el || elementRef?.value

    if (element) {
      element.addEventListener('pointermove', handlePointerMove)
      element.addEventListener('mouseleave', handlePointerLeave)
    }
  })

  onUnmounted(() => {
    const element = elementRef?.value?.$el || elementRef?.value

    if (element) {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('mouseleave', handlePointerLeave)
    }
  })
}
