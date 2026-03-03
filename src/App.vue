<script>
export default {
  onLaunch: function () {
    console.log('App Launch - 长辈刷视频')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 全局样式 */
page {
  background-color: #1a1a2e;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 全局重置 */
view, text, button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  outline: none;
}

button::after {
  display: none;
}
</style>
