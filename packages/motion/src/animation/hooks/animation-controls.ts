import type { AnimationControls } from '@/animation/types'
import { type MotionState, mountedStates } from '@/state'
import type { Options } from '@/types'
import { invariant } from 'hey-listen'
import { setTarget } from 'framer-motion/dist/es/render/utils/setters.mjs'
import type { VisualElement } from 'framer-motion'

function stopAnimation(visualElement: VisualElement) {
  visualElement.values.forEach(value => value.stop())
}

/**
 * @public
 */
export function animationControls(): AnimationControls {
  /**
   * Track whether the host component has mounted.
   */
  let hasMounted = false

  /**
   * A collection of linked component animation controls.
   */
  const subscribers = new Set<MotionState>()

  const controls: AnimationControls = {
    subscribe(state) {
      subscribers.add(state)
      return () => void subscribers.delete(state)
    },

    start(definition, transitionOverride) {
      invariant(
        hasMounted,
        'controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.',
      )

      const animations: Array<Promise<any>> = []
      subscribers.forEach((state) => {
        animations.push(
          state.animateUpdates({
            directAnimate: definition,
            directTransition: transitionOverride,
          }) as Promise<any>,
        )
      })

      return Promise.all(animations)
    },

    set(definition) {
      invariant(
        hasMounted,
        'controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.',
      )
      return subscribers.forEach((state) => {
        setValues(state, definition)
      })
    },

    stop() {
      subscribers.forEach((state) => {
        stopAnimation(state.visualElement)
      })
    },

    mount() {
      hasMounted = true

      return () => {
        hasMounted = false
        controls.stop()
      }
    },
  }

  return controls
}

export function setValues(
  state: MotionState,
  definition: Options['animate'],
) {
  if (typeof definition === 'string') {
    return setVariants(state, [definition])
  }
  else {
    setTarget(state.visualElement, definition as any)
  }
}

function setVariants(state: MotionState, variantLabels: string[]) {
  const reversedLabels = [...variantLabels].reverse()
  const visualElement = state.visualElement
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key)
    variant && setTarget(visualElement, variant)

    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(mountedStates.get(child.current as HTMLElement), variantLabels)
      })
    }
  })
}
