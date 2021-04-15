import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 音乐播放地址
        musicUrl:''
    },
    mutations:{
        getUrl(state,id){
            axios.get('https://autumnfish.cn/song/url',{
                params:{
                    id
                }
            }).then(res=>{
                console.log(res.data.data[0].url)
                state.musicUrl = res.data.data[0].url
            })
        }
    }
})

export default store