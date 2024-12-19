import { EventFeature, type Feature, HoverGesture, InViewGesture, LayoutFeature, PressGesture, SVGFeature } from '@/features'
import type { MotionState } from '@/state'

export class FeatureManager {
  features: Feature[] = []

  constructor(state: MotionState) {
    this.features = [
      new HoverGesture(state),
      new PressGesture(state),
      new InViewGesture(state),
      new SVGFeature(state),
      new EventFeature(state),
      new LayoutFeature(state),
    ]
  }

  mount() {
    this.features.forEach(feature => feature.mount())
  }

  beforeMount() {
    this.features.forEach(feature => feature.beforeMount?.())
  }

  unmount() {
    this.features.forEach(feature => feature.unmount())
  }

  update() {
    this.features.forEach(feature => feature.update?.())
  }

  beforeUpdate() {
    this.features.forEach(feature => feature.beforeUpdate())
  }

  beforeUnmount() {
    this.features.forEach(feature => feature.beforeUnmount())
  }
}
