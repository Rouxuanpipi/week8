//Step 2 -- Define Routes
import PageContent from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import Modify from './components/Modify.vue'

export default[
    { path: '/', component: PageContent},
    { path: '/orders', component: Orders},
    { path: '/modify', name:"Modify" ,component: Modify, props: true}
]


