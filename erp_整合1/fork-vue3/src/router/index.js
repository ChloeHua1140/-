import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DisplayInventory from "../views/main/Picking_invoice/DisplayInventory.vue";
import DeliveryGoods from "../views/main/Picking_invoice/DeliveryGoods.vue";
import DeliveryPicking from "../views/main/Picking_invoice/DeliveryPicking.vue";
import MaintainBillingDueList from "../views/main/Picking_invoice/MaintainBillingDueList.vue";
import CreateInvoice from "../views/main/Picking_invoice/CreateInvoice.vue";
import DisplayInvoice from "../views/main/Picking_invoice/DisplayInvoice.vue";

const routes = [
  {
    path: '/',
    component: () => import('../views/layout'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/create',
        name: 'create',
        component: () => import('../views/main/SD_order/order/order_create'),
        meta: { keepAlive: true }
      },
      {
        path: '/quotation_create',
        name: 'quotation_create',
        component: () => import('../views/main/SD_order/Quotation/quotation_create'),
        meta: { keepAlive: true }
      },
      {
        path: '/inquiry_manage',
        name: 'inquiry_manage',
        component: () => import('../views/main/SD_order/Inquiry/inquiry_manage')
      },
      {
        path: '/inquiry_create',
        name: 'inquiry_create',
        component: () => import('../views/main/SD_order/Inquiry/inquiry_create'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/quotation/type',
        name: 'quotation/type',
        component: () => import('../views/main/SD_order/Quotation/quotation_type')
      },
      {
        path: '/quotation_manage',
        name: 'quotation_manage',
        component: () => import('../views/main/SD_order/Quotation/quotation_display')
      },
      {
        path: '/price',
        name: 'price',
        component: () => import('../views/main/SD_order/order/discount')
      },
      {
        path: '/order_manage',
        name: 'order_manage',
        component: () => import('../views/main/SD_order/order/order_manage')
      },
      {
        path: '/order_type',
        name: 'order_type',
        component: () => import('../views/main/SD_order/order/order_type')
      },
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/main/SD_customer/index')
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import("../views/main/SD_customer/add")
      },
      {
        path: '/relation',
        name: 'Relation',
        component: () => import("../views/main/SD_customer/relation")
      },
      {
        path: '/display',
        name: 'displayNum',
        component: () => import("../views/main/SD_customer/display")
      },
      {
        path: '/editCustomer',
        name: 'EditCustomer',
        component: () => import("../views/main/SD_customer/editCustomer")
      },
      {
        path: '/editPerson',
        name: 'EditPerson',
        component: () => import("../views/main/SD_customer/editPerson")
      },
      {
        path: '/editRelation',
        name: 'EditRelation',
        component: () => import("../views/main/SD_customer/editRelation")
      },
      {
        path: '/all_price',
        name: 'all_price',
        component: () => import('../views/main/SD_order/order/all_discount')
      },
      {
        path: "/DisplayInventory",
        name: "display",
        component: DisplayInventory,
      },

      {
        path: "/DeliveryGoods",
        name: "delivery",
        component: DeliveryGoods,
      },

      {
        path: "/DeliveryPicking",
        name: "picking",
        component: DeliveryPicking,
      },

      {
        path: "/MaintainBillingDueList",
        name: "billing",
        component: MaintainBillingDueList,
      },

      {
        path: "/CreateInvoice",
        name: "invoice",
        component: CreateInvoice,
      },

      {
        path: "/DisplayInvoice",
        name: "displayinvoice",
        component: DisplayInvoice,
      },
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/main/welcome')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/main/Login')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,form,next) => {
  // 如果用户想要访问登录页面或者已经登录，放行
  if (to.path === '/login' || localStorage.getItem('LOGIN_INFO')) {
    next()
  } else {
    // 否则重定向到登录页面
    next('/login')
  }
})

export default router
