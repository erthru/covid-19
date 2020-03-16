<template>
    <div>
        <vue-headful :title="title" />

        <div :class="topInfoClass">FAQ</div>
        <p class="mt-2">Frequently asked question</p>

        No data.
    </div>
</template>

<script>
import VueHeadful from "vue-headful";
import Const from "../../helper/const";

export default {
    components: {
        VueHeadful
    },
    data: () => ({
        title: Const.title + "FAQ",
        topInfoClass: null
    }),
    mounted(){
        this.topInfoClass = this.$vuetify.breakpoint.name == "xs" || this.$vuetify.breakpoint.name == "sm" ? "display-1 font-weight-bold" : "mt-10 display-2 font-weight-bold";
    }
}
</script>