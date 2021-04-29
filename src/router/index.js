import Vue from 'vue'
import Router from 'vue-router'
import Add from "../views/Add";
import Share from "../views/Share";
import Read from "../views/Read";
import Note from "../views/Note";
import Login from "../views/Login";
import Register from "../views/Register";
import Delete from "../views/Delete";
import Set from "../views/Set";
import AccountInfo from "../views/set/AccountInfo";
import UserProfile from "../views/set/UserProfile";
import Tag from "../views/Tag";
import Person from "../views/Person";
import LoginInfo from "../views/set/LoginInfo";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/note'
    },
    {
      path: '/note/add',
      component: Add
    },
    {
      path: '/note/share',
      component: Share
    },{
      path: '/note/read/:id',
      component: Read
    },
    {
      path: '/note',
      component: Note
    },
    {
      path: '/tag',
      component: Tag
    },
    {
      path: '/note/delete',
      component: Delete
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/user/reg',
      component: Register
    },
    {
      path: '/user/person',
      component: Person
    },
    {
      path: '/user/set',
      component: Set,
      children: [
        {
          path: '/user/set',
          redirect: '/user/set/accountInfo'
        },
        {
          path: '/user/set/accountInfo',
          component: AccountInfo
        },
        {
          path: '/user/set/userProfile',
          component: UserProfile
        },
        {
          path: '/user/set/loginInfo',
          component: LoginInfo
        }
      ]
    }
  ]
})
