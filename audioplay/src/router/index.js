import Vue from 'vue'
import Router from 'vue-router'
import discovery from '@/components/discovery'
import playlist from '@/components/playlist'
import music from '@/components/music'
import mv from '@/components/mv'
import result from '@/components/result'
import mvDetail from '@/components/mvDetail'
import songsDetail from '@/components/songsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/discovery',
      name: 'discovery',
      component: discovery
    },{
      path: '/playlist',
      name: 'playlist',
      component: playlist
    },{
      path: '/music',
      name: 'music',
      component: music
    },{
      path: '/mv',
      name: 'mv',
      component: mv
    },{
      path: '/result',
      name: 'result',
      component: result
    },{
      path: '/mvDetail',
      name: 'mvDetail',
      component: mvDetail
    },{
      path: '/songsDetail',
      name: 'songsDetail',
      component: songsDetail
    },{
      path: '/',
      redirect: '/discovery'
    }
  ]
})
