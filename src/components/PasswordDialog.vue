<template>
  <view class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999]" v-if="visible" @tap.stop>
    <view class="w-[600rpx] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[32rpx] p-8 border border-white/10 shadow-2xl flex flex-col">
      <text class="text-xl text-white text-center font-bold mb-2">
        {{ isSetMode ? '🔐 设置退出密码' : '🔒 验证退出密码' }}
      </text>
      
      <text class="text-sm text-white/60 text-center mb-6" v-if="isSetMode">
        设置4位数字密码，关闭蒙层时需要输入
      </text>

      <view class="mb-4">
        <input
          class="w-full h-14 bg-white/5 rounded-2xl px-4 text-xl text-white border border-white/10 text-center tracking-[1rem] focus:border-indigo-500/50 transition-colors"
          type="number"
          :password="true"
          :maxlength="4"
          placeholder="请输入4位数字密码"
          placeholder-style="color: rgba(255,255,255,0.3); letter-spacing: normal; font-size: 14px;"
          v-model="password"
          @confirm="handleConfirm"
        />
      </view>

      <view class="mb-2" v-if="isSetMode">
        <input
          class="w-full h-14 bg-white/5 rounded-2xl px-4 text-xl text-white border border-white/10 text-center tracking-[1rem] focus:border-indigo-500/50 transition-colors"
          type="number"
          :password="true"
          :maxlength="4"
          placeholder="请再次确认密码"
          placeholder-style="color: rgba(255,255,255,0.3); letter-spacing: normal; font-size: 14px;"
          v-model="confirmPassword"
          @confirm="handleConfirm"
        />
      </view>

      <text class="text-sm text-rose-500 text-center mb-4 min-h-[20px]">
        {{ errorMsg }}
      </text>

      <view class="flex flex-row gap-4 mt-2">
        <button class="flex-1 h-12 rounded-xl text-base font-bold flex items-center justify-center bg-white/10 text-white/80 hover:bg-white/20 active:bg-white/30 transition-colors !m-0" @tap="handleCancel">取消</button>
        <button class="flex-1 h-12 rounded-xl text-base font-bold flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] active:scale-[0.98] transition-all !m-0" @tap="handleConfirm">确认</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  /** true = 设置密码模式, false = 验证密码模式 */
  isSetMode: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'confirm', password: string): void
  (e: 'cancel'): void
}>()

const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

watch(() => props.visible, (val) => {
  if (val) {
    password.value = ''
    confirmPassword.value = ''
    errorMsg.value = ''
  }
})

function handleConfirm() {
  if (password.value.length !== 4) {
    errorMsg.value = '请输入4位数字密码'
    return
  }
  if (props.isSetMode) {
    if (confirmPassword.value !== password.value) {
      errorMsg.value = '两次密码不一致'
      return
    }
  }
  errorMsg.value = ''
  emit('confirm', password.value)
}

function handleCancel() {
  emit('update:visible', false)
  emit('cancel')
}
</script>
