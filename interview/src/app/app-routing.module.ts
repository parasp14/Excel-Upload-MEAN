import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceluploadComponent } from './excelupload/excelupload.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: ExceluploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
