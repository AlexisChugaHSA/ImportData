import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MdChartComponent } from './md/md-chart/md-chart.component';
import { MdTableComponent } from './md/md-table/md-table.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './settings-user/settings-usuario.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MembresiasComponent } from './membresias/membresias.component';
import { ProductosComponent } from './productos/productos.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { OrdenProductosComponent } from './orden-productos/orden-productos.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormularioPagoComponent } from './formulario-pago/formulario-pago.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup-component/popup-component.component';
import { PopupPagoComponent } from './popup-pago/popup-pago.component';
import { MenuComponent } from './menu/menu.component';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { PopupLogoutComponent } from './popup-logout/popup-logout.component';
import { HomeComponent } from './home/home.component';
import { PopupCancelarPagoComponent } from './popup-cancelar-pago/popup-cancelar-pago.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardProductoComponent } from './dashboard-producto/dashboard-producto.component';
import { PruebasImpComponent } from './pruebas-imp/pruebas-imp.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DashboardPricingComponent } from './dashboard-pricing/dashboard-pricing.component';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Dashboard2Component,
    MdChartComponent,
    MdTableComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    FacturacionComponent,
    NewUserComponent,
    PaymentComponent,
    MembresiasComponent,
    ProductosComponent,
    PruebasComponent,
    DetalleProductoComponent,
    OrdenProductosComponent,
    FormularioPagoComponent,
    PopupComponent,
    PopupPagoComponent,
    MenuComponent,
    DetalleFacturaComponent,
    PopupLogoutComponent,
    HomeComponent,
    PopupCancelarPagoComponent,
    DashboardProductoComponent,
    PruebasImpComponent,
    DashboardPricingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    CommonModule,
    MatTooltipModule,
    NgSelectModule,
    MatButtonModule,
    MatDialogModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
