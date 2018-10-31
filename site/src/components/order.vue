<template>
    <div>
        订单
        <footbar></footbar>
    </div>
</template>

<script>
    export default {
        name: "order",



        created(){
            this.$store.state.selected='order'
        }
    }
</script>

<style scoped>

</style>
