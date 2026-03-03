<template>
  <view class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 p-4 pb-24 text-white font-sans antialiased">
    <!-- 顶部 Logo 区域 -->
    <view class="flex flex-col items-center pt-12 pb-8">
      <view class="flex flex-row items-center mb-3">
        <text class="text-5xl mr-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">📺</text>
        <text class="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">长辈刷视频</text>
      </view>
      <text class="text-sm text-gray-400/80 font-medium">让爸妈安心刷视频，告别误触烦恼</text>
    </view>

    <!-- 无障碍服务状态卡片 -->
    <view 
      class="rounded-3xl p-6 mb-5 border backdrop-blur-xl transition-all duration-500 shadow-xl"
      :class="accessibilityEnabled 
        ? 'bg-emerald-500/10 border-emerald-500/30 shadow-emerald-900/20' 
        : 'bg-rose-500/10 border-rose-500/30 shadow-rose-900/20'"
    >
      <view class="flex flex-row items-center mb-3">
        <text class="text-2xl mr-3">{{ accessibilityEnabled ? '✅' : '⚠️' }}</text>
        <text class="text-xl font-bold text-white tracking-wide">无障碍服务</text>
      </view>
      <text class="block text-sm mb-5" :class="accessibilityEnabled ? 'text-emerald-300/80' : 'text-rose-300/80'">
        {{ accessibilityEnabled ? '已开启，服务正常运行' : '未开启，请先开启无障碍服务' }}
      </text>
      <button
        v-if="!accessibilityEnabled"
        class="w-full h-14 rounded-2xl font-bold text-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-transform active:scale-[0.98]"
        @tap="handleOpenAccessibility"
      >
        👉 去开启无障碍服务
      </button>
    </view>

    <!-- 蒙层控制卡片 -->
    <view class="bg-white/5 border border-white/10 rounded-3xl p-6 mb-5 backdrop-blur-xl shadow-xl">
      <view class="flex flex-row items-center mb-3">
        <text class="text-2xl mr-3">🛡️</text>
        <text class="text-xl font-bold text-white tracking-wide">防误触蒙层</text>
      </view>
      <text class="block text-sm text-gray-400/80 mb-6 leading-relaxed">
        开启后将在抖音界面覆盖透明蒙层，屏蔽所有按钮点击，只保留上下滑动
      </text>
      <button
        class="w-full h-14 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300"
        :class="[
          !accessibilityEnabled ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed' :
          maskRunning ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] active:scale-[0.98]' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] active:scale-[0.98]'
        ]"
        :disabled="!accessibilityEnabled"
        @tap="handleToggleMask"
      >
        <text class="mr-2">{{ maskRunning ? '🔴' : '🟢' }}</text>
        {{ maskRunning ? '关闭蒙层' : '开启蒙层' }}
      </button>
    </view>

    <!-- 功能设置卡片 -->
    <view class="bg-white/5 border border-white/10 rounded-3xl p-2 mb-5 backdrop-blur-xl shadow-xl">
      <view class="flex flex-row items-center p-4 pb-2">
        <text class="text-2xl mr-3 drop-shadow-md">⚙️</text>
        <text class="text-xl font-bold text-white tracking-wide">功能设置</text>
      </view>

      <view class="flex flex-col px-2">
        <!-- 开机自启 -->
        <view class="flex flex-row items-center justify-between p-4 border-b border-white/5 rounded-xl">
          <view class="flex flex-row items-center">
            <view class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
              <text class="text-lg">🚀</text>
            </view>
            <view class="flex flex-col">
              <text class="text-base text-gray-100 font-medium tracking-wide">开机自启</text>
              <text class="text-xs text-emerald-300/70 mt-1">开机后自动打开防误触蒙层</text>
            </view>
          </view>
          <switch :checked="autoStartEnabled" @change="handleAutoStartToggle" color="#10b981" style="transform: scale(0.8)"/>
        </view>

        <!-- 密码锁定 -->
        <view class="flex flex-row items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors rounded-xl" @tap="handlePasswordSetting">
          <view class="flex flex-row items-center">
            <view class="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
              <text class="text-lg">🔒</text>
            </view>
            <view class="flex flex-col">
              <text class="text-base text-gray-100 font-medium tracking-wide">退出密码</text>
              <text class="text-xs text-indigo-300/70 mt-1">{{ passwordSet ? '已设置' : '未设置，点击设置' }}</text>
            </view>
          </view>
          <text class="text-2xl text-gray-500">›</text>
        </view>

        <!-- 音量控制 -->
        <view class="flex flex-row items-center justify-between p-4 border-b border-white/5 rounded-xl">
          <view class="flex flex-row items-center">
            <view class="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
              <text class="text-lg">🔊</text>
            </view>
            <view class="flex flex-col">
              <text class="text-base text-gray-100 font-medium tracking-wide">媒体音量</text>
              <text class="text-xs text-teal-300/70 mt-1">当前：{{ currentVolume }} / {{ maxVolume }}</text>
            </view>
          </view>
          <view class="flex flex-row gap-3">
            <button class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center !p-0 !m-0" @tap="handleVolumeDown">
              <text class="text-white text-sm">➖</text>
            </button>
            <button class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center !p-0 !m-0" @tap="handleVolumeUp">
              <text class="text-white text-sm">➕</text>
            </button>
          </view>
        </view>

        <!-- 清除密码 -->
        <view class="flex flex-row items-center justify-between p-4 active:bg-white/5 transition-colors rounded-xl" v-if="passwordSet" @tap="handleClearPassword">
          <view class="flex flex-row items-center">
            <view class="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center mr-4">
              <text class="text-lg">🗑️</text>
            </view>
            <view class="flex flex-col">
              <text class="text-base text-gray-100 font-medium tracking-wide">清除密码</text>
              <text class="text-xs text-rose-300/70 mt-1">移除退出密码限制</text>
            </view>
          </view>
          <text class="text-2xl text-gray-500">›</text>
        </view>
      </view>
    </view>

    <!-- 使用说明卡片 -->
    <view class="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl shadow-xl">
      <view class="flex flex-row items-center mb-5">
        <text class="text-2xl mr-3 drop-shadow-md">📖</text>
        <text class="text-xl font-bold text-white tracking-wide">使用说明</text>
      </view>
      
      <view class="flex flex-col gap-4">
        <view class="flex flex-row items-start group" v-for="(item, index) in ['开启上方「无障碍服务」', '设置退出密码（可选）', '点击「开启蒙层」按钮', '切换到抖音，即可安心刷视频', '使用右侧控制面板操作上下切换和音量']" :key="index">
          <view class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 mr-3 shadow-lg group-hover:scale-110 transition-transform">
            <text class="text-white text-xs font-bold">{{ index + 1 }}</text>
          </view>
          <text class="text-sm text-gray-300/90 leading-relaxed pt-1 group-hover:text-white transition-colors">{{ item }}</text>
        </view>
      </view>
    </view>

    <view class="flex justify-center py-4 opacity-50">
      <text class="text-xs tracking-widest text-white/50">v1.0.0 · 为爸妈而做 ❤️</text>
    </view>

    <!-- 密码设置弹窗 -->
    <PasswordDialog
      v-model:visible="showPasswordDialog"
      :isSetMode="true"
      @confirm="handlePasswordConfirm"
      @cancel="showPasswordDialog = false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import PasswordDialog from '@/components/PasswordDialog.vue'
import { getPassword, setPassword, hasPassword, clearPassword as clearStoredPassword, getAutoStart, setAutoStart } from '@/utils/storage'

// #ifdef APP-PLUS
import {
  isAccessibilityEnabled,
  openAccessibilitySettings,
  startMask,
  stopMask,
  isMaskRunning,
  setNativePassword,
  getVolume,
  getMaxVolume,
  volumeUp,
  volumeDown
} from '@/uni_modules/tiktok-mask-plugin'
// #endif

const accessibilityEnabled = ref(false)
const maskRunning = ref(false)
const passwordSet = ref(false)
const autoStartEnabled = ref(false)
const showPasswordDialog = ref(false)
const currentVolume = ref(0)
const maxVolume = ref(15)

onMounted(() => {
  checkStatus()
})

// 页面每次显示时刷新状态（从设置页返回后）
onShow(() => {
  checkStatus()
})

/** 检查各项状态 */
function checkStatus() {
  // #ifdef APP-PLUS
  accessibilityEnabled.value = isAccessibilityEnabled()
  maskRunning.value = isMaskRunning()
  currentVolume.value = getVolume()
  maxVolume.value = getMaxVolume()
  // #endif

  passwordSet.value = hasPassword()
  autoStartEnabled.value = getAutoStart()

  // 同步密码到原生层
  const pwd = getPassword()
  if (pwd) {
    // #ifdef APP-PLUS
    setNativePassword(pwd)
    // #endif
  }
}

/** 打开无障碍设置 */
function handleOpenAccessibility() {
  // #ifdef APP-PLUS
  openAccessibilitySettings()
  // #endif
  uni.showToast({
    title: '请在列表中找到「长辈刷视频」并开启',
    icon: 'none',
    duration: 3000
  })
}

/** 开关蒙层 */
function handleToggleMask() {
  if (!accessibilityEnabled.value) {
    uni.showToast({
      title: '请先开启无障碍服务',
      icon: 'none'
    })
    return
  }

  // #ifdef APP-PLUS
  if (maskRunning.value) {
    stopMask()
    maskRunning.value = false
    uni.showToast({
      title: '蒙层已关闭',
      icon: 'none'
    })
  } else {
    // 同步密码到原生层
    const pwd = getPassword()
    if (pwd) {
      setNativePassword(pwd)
    }
    startMask()
    maskRunning.value = true
    uni.showToast({
      title: '蒙层已开启，请切换到抖音',
      icon: 'none',
      duration: 2000
    })
  }
  // #endif
}

/** 设置密码 */
function handlePasswordSetting() {
  showPasswordDialog.value = true
}

/** 密码确认 */
function handlePasswordConfirm(pwd: string) {
  setPassword(pwd)
  passwordSet.value = true
  showPasswordDialog.value = false

  // #ifdef APP-PLUS
  setNativePassword(pwd)
  // #endif

  uni.showToast({
    title: '密码设置成功',
    icon: 'success'
  })
}

/** 清除密码 */
function handleClearPassword() {
  uni.showModal({
    title: '确认清除',
    content: '清除后，关闭蒙层将不再需要密码',
    success: (res) => {
      if (res.confirm) {
        clearStoredPassword()
        passwordSet.value = false
        // #ifdef APP-PLUS
        setNativePassword('')
        // #endif
        uni.showToast({
          title: '密码已清除',
          icon: 'success'
        })
      }
    }
  })
}

/** 开关开机自启 */
function handleAutoStartToggle(e: any) {
  const isEnabled = e.detail.value
  autoStartEnabled.value = isEnabled
  setAutoStart(isEnabled)
  uni.showToast({
    title: isEnabled ? '已开启开机自启' : '已关闭开机自启',
    icon: 'none'
  })
}

/** 音量+ */
function handleVolumeUp() {
  // #ifdef APP-PLUS
  volumeUp()
  setTimeout(() => {
    currentVolume.value = getVolume()
  }, 200)
  // #endif
}

/** 音量- */
function handleVolumeDown() {
  // #ifdef APP-PLUS
  volumeDown()
  setTimeout(() => {
    currentVolume.value = getVolume()
  }, 200)
  // #endif
}
</script>


