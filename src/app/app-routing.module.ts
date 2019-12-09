import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes:Routes=[
  {
    path: 'editor',
    loadChildren:()=>import(`./editor/editor.module`).then(m=>m.EditorModule)
  },
  {
    path: 'profile',
    loadChildren:()=>import(`./profile/profile.module`).then(m=>m.ProfileModule)
  },
  {
    path: 'settings',
    loadChildren:()=>import(`./settings/settings.module`).then(m=>m.SettingsModule)
  },
  {
    path: 'dashboard',
    loadChildren:()=>import(`./dashboard/dashboard.module`).then(m=>m.DashboardModule)
  },
  {
    path:'post/:id',
    loadChildren:()=>import(`./blog/blog.module`).then(m=>m.BlogModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      // preload all modules; optionally we could
      // implement a custom preloading strategy for just some
      // of the modules (PRs welcome 😉)
     preloadingStrategy: PreloadAllModules
    })
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
