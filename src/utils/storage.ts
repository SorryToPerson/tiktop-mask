/**
 * 本地存储工具
 * 管理密码、开机自启等设置的持久化
 */

const STORAGE_KEYS = {
  /** 锁定密码 */
  PASSWORD: "mask_password",
  /** 是否开启开机自启 */
  AUTO_START: "mask_auto_start",
  /** 蒙层透明度 */
  MASK_OPACITY: "mask_opacity",
  /** 是否已设置过密码 */
  HAS_PASSWORD: "mask_has_password",
} as const;

/**
 * 获取存储的密码
 */
export function getPassword(): string {
  return uni.getStorageSync(STORAGE_KEYS.PASSWORD) || "";
}

/**
 * 设置密码
 */
export function setPassword(password: string): void {
  uni.setStorageSync(STORAGE_KEYS.PASSWORD, password);
  uni.setStorageSync(STORAGE_KEYS.HAS_PASSWORD, true);
}

/**
 * 是否已设置密码
 */
export function hasPassword(): boolean {
  return !!uni.getStorageSync(STORAGE_KEYS.HAS_PASSWORD);
}

/**
 * 清除密码
 */
export function clearPassword(): void {
  uni.removeStorageSync(STORAGE_KEYS.PASSWORD);
  uni.removeStorageSync(STORAGE_KEYS.HAS_PASSWORD);
}

/**
 * 验证密码
 */
export function verifyPassword(input: string): boolean {
  const saved = getPassword();
  return saved === input;
}

/**
 * 获取开机自启设置
 */
export function getAutoStart(): boolean {
  return !!uni.getStorageSync(STORAGE_KEYS.AUTO_START);
}

/**
 * 设置开机自启
 */
export function setAutoStart(enable: boolean): void {
  uni.setStorageSync(STORAGE_KEYS.AUTO_START, enable);
}
