<template>
    <v-app>
        <v-app-bar dark app>
            <v-app-bar-nav-icon v-if="isModeXS" v-on:click="drawer = !drawer"/>

            <v-toolbar-title><v-icon class="mb-1">mdi-bacteria</v-icon><strong><a to="/" class="white--text ml-4">COVID 19</a></strong></v-toolbar-title>

            <v-spacer />

            <div v-if="!isModeXS">
                <strong><router-link to="/" class="white--text mr-4">HOME</router-link></strong>
                <strong><router-link to="/about" class="white--text mr-4">ABOUT</router-link></strong>
                <strong><router-link to="/faq" class="white--text">FAQ</router-link></strong>
            </div>
        </v-app-bar>

        <v-content class="grey darken-4 white--text">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-navigation-drawer v-model="drawer" absolute temporary dark>
            <v-row class="pt-8 pb-4 mr-2" justify="center">
                <v-col cols="2" class="mr-3">
                    <v-icon size="32px">mdi-bacteria</v-icon>
                </v-col>

                <v-col cols="4">
                    <h1 class="white--text mt-2">COVID 19</h1>
                </v-col>
            </v-row>

            <v-list dense>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><strong><router-link to="/" class="white--text">HOME</router-link></strong></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="mt-2"/>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-information-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><strong><router-link to="/about" class="white--text">ABOUT</router-link></strong></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="mt-2"/>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-help</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><strong><router-link to="/faq" class="white--text">FAQ</router-link></strong></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        isModeXS: false,
        drawer: false
    }),
    mounted(){
        this.isModeXS = this.$vuetify.breakpoint.name == "xs";
    }
}
</script>