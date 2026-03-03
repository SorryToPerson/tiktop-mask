<template>
  <view class="min-h-screen bg-white p-6 flex flex-col items-center justify-center font-sans">
    
    <view class="mb-12 flex flex-col items-center">
      <text class="text-6xl mb-4">📺</text>
      <text class="text-2xl font-bold text-gray-800 tracking-wider">长辈刷视频</text>
    </view>

    <!-- 权限区域 -->
    <view class="w-full max-w-sm mb-10 flex flex-col gap-4">
      <button 
        v-if="!accessibilityEnabled"
        class="w-full h-14 rounded-full bg-rose-50 text-rose-600 font-bold text-lg flex items-center justify-center shadow-sm active:scale-95 transition-all"
        @tap="handleOpenAccessibility"
      >
        ⚠️ 开启无障碍服务
      </button>

      <button 
        v-if="!overlayEnabled"
        class="w-full h-14 rounded-full bg-orange-50 text-orange-600 font-bold text-lg flex items-center justify-center shadow-sm active:scale-95 transition-all"
        @tap="handleOpenOverlay"
      >
        ⚠️ 开启悬浮窗权限
      </button>
    </view>

    <!-- 主控按钮 -->
    <view class="w-full max-w-sm">
      <button
        class="w-full h-16 rounded-full font-bold text-xl flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300"
        :class="[
          (!accessibilityEnabled || !overlayEnabled) ? 'bg-gray-200 text-gray-400' :
          maskRunning ? 'bg-red-500 text-white shadow-red-200' : 'bg-black text-white shadow-gray-200'
        ]"
        @tap="handleToggleMask"
      >
        {{ maskRunning ? '关闭蒙层' : '开启蒙层' }}
      </button>
    </view>
    
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// #ifdef APP-PLUS
import {
  isAccessibilityEnabled,
  openAccessibilitySettings,
  canDrawOverlays,
  requestOverlayPermission,
  startMask,
  stopMask,
  isMaskRunning
} from '@/uni_modules/tiktok-mask-plugin'
// #endif

const accessibilityEnabled = ref(false)
const overlayEnabled = ref(false)
const maskRunning = ref(false)

onMounted(() => {
  checkStatus()
})

onShow(() => {
  checkStatus()
})

function checkStatus() {
  // #ifdef APP-PLUS
  accessibilityEnabled.value = isAccessibilityEnabled()
  overlayEnabled.value = canDrawOverlays()
  maskRunning.value = isMaskRunning()
  // #endif
}

function handleOpenAccessibility() {
  // #ifdef APP-PLUS
  openAccessibilitySettings()
  // #endif
}

function handleOpenOverlay() {
  // #ifdef APP-PLUS
  requestOverlayPermission()
  // #endif
}

function handleToggleMask() {
  if (!accessibilityEnabled.value || !overlayEnabled.value) {
    uni.showToast({
      title: '请先开启必要权限',
      icon: 'none'
    })
    return
  }

  // #ifdef APP-PLUS
  if (maskRunning.value) {
    stopMask()
    maskRunning.value = false
    uni.showToast({ title: '已关闭', icon: 'none' })
  } else {
    startMask()
    maskRunning.value = true
    uni.showToast({ title: '已开启，请去刷视频', icon: 'none' })
  }
  // #endif
}
</script>

<style>
/* 避免默认的 button 样式影响 */
button::after {
  border: none;
}
</style>
