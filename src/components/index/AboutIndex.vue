<template>
    <div>
        <vue-headful :title="title" />

        <div :class="topInfoClass">About</div>
        <p class="mt-2">Showing Something</p>

        <h4>Api Used:</h4>
        <ul>
            <li><a class="white--text" href="https://api.kawalcorona.com/">https://api.kawalcorona.com/</a></li>
            <li><a class="white--text" href="https://newsapi.org/">https://newsapi.org/</a></li>
        </ul>
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
        title: Const.title + "About",
        topInfoClass: null
    }),
    mounted(){
        this.topInfoClass = this.$vuetify.breakpoint.name == "xs" || this.$vuetify.breakpoint.name == "sm" ? "display-1 font-weight-bold" : "mt-10 display-2 font-weight-bold";
    }
}
</script>