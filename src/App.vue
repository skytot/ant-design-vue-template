<template>
<div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
export default {
    data() {
        return {
            collapsed: false
        }
    }
}
</script>

<style>
#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, .2);
    margin: 16px;
}
</style>
