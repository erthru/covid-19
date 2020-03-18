<template>
    <div>
        <vue-headful :title="title" />
        
        <div :class="topInfoClass">Current Information About The Outbreak Of Covid-19</div>
        <p class="mt-2">Is a website that displays the latest information about the outbreak of covid-19 (coronavirus)</p>

        <br />
        <br />

        <h2>Current Number Of Cases</h2>

        <v-row class="mt-2">
            <v-col cols="12" sm="6" md="3">
                <v-card color="pink lighten-1 white--text" class="pa-4" height="140px">
                    <center>
                        <span class="title font-weight-bold">INFECTED</span>
                        <br />
                        <number from="0" :to="infected" class="display-2 pt-2"/>
                    </center>
                </v-card>
            </v-col>


            <v-col cols="12" sm="6" md="3">
                <v-card color="green lighten-1 white--text" class="pa-4" height="140px">
                    <center>
                        <span class="title font-weight-bold">RECOVERED</span>
                        <br />
                        <number from="0" :to="recovered" class="display-2 pt-2" />
                    </center>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card color="red lighten-1 white--text" class="pa-4" height="140px">
                    <center>
                        <span class="title font-weight-bold">DEATHS</span>
                        <br />
                        <number from="0" :to="deaths" class="display-2 pt-2" />
                    </center>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card color="brown lighten-1 white--text" class="pa-4" height="140px">
                    <center>
                        <span class="title font-weight-bold">INDONESIA</span>
                        <br />
                        
                        <number from="0" :to="indonesiaInfected" /><span class="ml-1">Infected</span>
                        <br />

                        <number from="0" :to="indonesiaRecovered" /><span class="ml-1">Recovered</span>
                        <br />

                        <number from="0" :to="indonesiaDeaths" /><span class="ml-1">Deaths</span>
                    </center>
                </v-card>
            </v-col>
        </v-row>

        <GmapMap :center="{lat:-2.3932707, lng:108.8497264}" :zoom="2.6" map-type-id="terrain" style="width: 100%; height: 500px" class="mt-4" :options="{styles: mapsStyles, minZoom: 1}">
            <GmapMarker v-for="(infectedLocation, index) in infectedLocations" :key="index" :clickable="true" :position="infectedLocation.position" v-on:click="selectedInfectedLocation = infectedLocation; markerOnClick()"/>
        </GmapMap>

        <center><div class="grey--text mt-4">Last update: {{ lastUpdate }}</div></center>

        <br />
        <br />

        <h2>Current Updates</h2>
        
        <center><v-progress-circular indeterminate color="white" class="mt-4" v-if="isArticleLoading"/></center>

        <masonry class="mt-2" :cols="masonryCols" style="margin-left: -14px; margin-right: -15px">
            <div class="pa-4" v-for="(article, index) in articles" :key="index">
                <v-card class="pa-4" color="grey darken-3">
                    <v-row v-if="isModeXS">
                        <v-col cols="12" class="d-flex justify-center">
                            <v-avatar size="60px">
                                <v-img :src="article.urlToImage" />
                            </v-avatar>
                        </v-col>

                        <v-col cols="12">
                            <a class="headline white--text font-weight-medium" :href="article.url" target="blank">{{ article.title }}</a>
                            <br />
                            <p class="grey--text text--lighten-1">{{ article.description }}</p>
                            <label class="grey--text">{{ new Date(article.publishedAt).toString().replace("GMT+0800", "") }}</label>
                        </v-col>
                    </v-row>

                    <v-row v-if="!isModeXS">
                        <v-col cols="1">
                            <v-avatar size="60px">
                                <v-img :src="article.urlToImage" />
                            </v-avatar>
                        </v-col>

                        <v-col cols="11" class="pl-8">
                            <a class="headline white--text font-weight-medium" :href="article.url" target="blank">{{ article.title }}</a>
                            <br />
                            <p class="grey--text text--lighten-1">{{ article.description }}</p>
                            <label class="grey--text">{{ new Date(article.publishedAt).toString().replace("GMT+0800", "") }}</label>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </masonry>

        <center><v-progress-circular indeterminate color="white" class="mt-4" v-if="isArticleLoadingNext"/></center>

        <br />

        <!-- outside content -->
        <v-dialog v-model="isInfoDialogShowing" max-width="290px">
            <v-card class="pa-6">
                <div class="headline pb-2"><strong>{{ selectedInfectedLocation.provinceState != null ? selectedInfectedLocation.provinceState : selectedInfectedLocation.countryRegion }}</strong></div>
                <div>Infected: {{ selectedInfectedLocation.confirmed }}</div>
                <div>Recovered: {{ selectedInfectedLocation.recovered }}</div>
                <div>Deaths: {{ selectedInfectedLocation.deaths }}</div>
                <div>Last Update: {{ new Date(selectedInfectedLocation.lastUpdate).toString().replace("GMT+0800", "") }}</div>

                <v-btn class="d-flex ml-auto mt-3" color="red darken-3" text v-on:click="isInfoDialogShowing = false">Close</v-btn>
            </v-card>
        </v-dialog>
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
        title: Const.title + "Home",
        topInfoClass: null,
        page: 1,
        articles: [],
        articleTotal: 0,
        isModeXS: false,
        isArticleLoading: true,
        isArticleLoadingNext: false,
        masonryCols: 2,
        infected: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: "-",
        indonesiaInfected: 0,
        indonesiaRecovered: 0,
        indonesiaDeaths: 0,
        infectedLocations: [],
        selectedInfectedLocation: {},
        isInfoDialogShowing: false,
        mapsStyles: [
            {elementType: 'geometry', stylers: [{color: '#545454'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#545454'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#252626'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#252626'}]
            }
        ]
    }),
    mounted(){
        this.isModeXS = this.$vuetify.breakpoint.name == "xs";
        this.topInfoClass = this.$vuetify.breakpoint.name == "xs" || this.$vuetify.breakpoint.name == "sm" ? "display-1 font-weight-bold" : "mt-10 display-2 font-weight-bold";
        this.masonryCols = this.$vuetify.breakpoint.name == "xs" ? 1 : 2;
        this.loadCases();
        this.loadArticle();

        window.onscroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if (this.articleTotal > this.articles.length) {
                    this.page += 1;
                    this.loadArticle();
                }
            }
        };
    },
    methods:{
        loadCases(){
            this.$http.get("https://covid19.mathdro.id/api").then(res => {
                this.infected = res.data.confirmed.value;
                this.recovered = res.data.recovered.value;
                this.deaths = res.data.deaths.value;
                this.lastUpdate = (new Date(res.data.lastUpdate)).toString().replace("GMT+0800", "");
            });

            this.$http.get("https://covid19.mathdro.id/api/countries/ID").then(res => {
                this.indonesiaInfected = res.data.confirmed.value;
                this.indonesiaRecovered = res.data.recovered.value;
                this.indonesiaDeaths = res.data.deaths.value;
            });

            this.$http.get("https://covid19.mathdro.id/api/confirmed").then(res => {
                res.data.forEach(item => {
                    this.infectedLocations.push({
                        provinceState: item.provinceState,
                        countryRegion: item.countryRegion,
                        lastUpdate: item.lastUpdate,
                        confirmed: item.confirmed,
                        recovered: item.recovered,
                        deaths: item.deaths,
                        active: item.active,
                        position: {
                            lat: item.lat,
                            lng: item.long
                        }
                    });
                });
            });
        },
        loadArticle(){
            if(this.page == 1){
                this.isArticleLoading = true;
                this.isArticleLoadingNext = false;
            }else{
                this.isArticleLoading = false;
                this.isArticleLoadingNext = true;
            }

            this.$http.get("https://newsapi.org/v2/everything?q=covid%2019&sortBy=publishedAt&apiKey=29c67250fa56435bb36b8ac010ab0a3f&pageSize=8&page="+this.page).then(res => {
                res.data.articles.forEach(item => {
                    this.articles.push(item);
                });

                this.articleTotal = res.data.totalResults;
                
                this.isArticleLoading = false;
                this.isArticleLoadingNext = false;
            });
        },
        markerOnClick(){
            this.isInfoDialogShowing = true;
        }
    }
}
</script>