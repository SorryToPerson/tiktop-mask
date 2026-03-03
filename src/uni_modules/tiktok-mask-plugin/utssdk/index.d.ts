/**
 * 抖音蒙层插件类型声明
 */

/** 检查无障碍服务是否已开启 */
export function isAccessibilityEnabled(): boolean;

/** 打开系统无障碍设置页面 */
export function openAccessibilitySettings(): void;

/** 检查悬浮窗权限 */
export function canDrawOverlays(): boolean;

/** 请求悬浮窗权限 */
export function requestOverlayPermission(): void;

/** 启动蒙层 */
export function startMask(): void;

/** 停止蒙层 */
export function stopMask(): void;

/** 设置媒体音量 */
export function setVolume(level: number): void;

/** 获取当前媒体音量 */
export function getVolume(): number;

/** 获取最大媒体音量 */
export function getMaxVolume(): number;

/** 音量增加 */
export function volumeUp(): void;

/** 音量减少 */
export function volumeDown(): void;

/** 检查蒙层是否正在运行 */
export function isMaskRunning(): boolean;

/** 设置密码到原生层 */
export function setNativePassword(password: string): void;
