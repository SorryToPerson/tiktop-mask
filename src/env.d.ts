/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/uni_modules/tiktok-mask-plugin' {
  export function isAccessibilityEnabled(): boolean
  export function openAccessibilitySettings(): void
  export function canDrawOverlays(): boolean
  export function requestOverlayPermission(): void
  export function startMask(): void
  export function stopMask(): void
  export function setVolume(level: number): void
  export function getVolume(): number
  export function getMaxVolume(): number
  export function volumeUp(): void
  export function volumeDown(): void
  export function isMaskRunning(): boolean
  export function setNativePassword(password: string): void
}
