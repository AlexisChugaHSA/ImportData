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
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PopupBienvenidaComponent } from './popup-bienvenida/popup-bienvenida.component';
import { PopupCargandoComponent } from './popup-cargando/popup-cargando.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PoliticasPrivacidadComponent } from './politicas-privacidad/politicas-privacidad.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FooterComponent } from './footer/footer.component';
import { Footer2Component } from './footer2/footer2.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PopupRecuperarPasswordComponent } from './popup-recuperar-password/popup-recuperar-password.component';
import { PopupContraseniaTemporalComponent } from './popup-contrasenia-temporal/popup-contrasenia-temporal.component';
import { PopupErrorNewUsuarioComponent } from './popup-error-new-usuario/popup-error-new-usuario.component';
import { PopupErrorPagoComponent } from './popup-error-pago/popup-error-pago.component';
import {initializeApp,provideFirebaseApp} from '@angular/fire/app'
import {provideAuth,getAuth} from '@angular/fire/auth'
import { environment } from './enviroments/enviroment';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: [
    PopupCargandoComponent,
    TerminosCondicionesComponent,
    PoliticasPrivacidadComponent

  ]
})
export class DemoMaterialModule {}

@NgModule({

  declarations: [
  
    AppComponent,
    DashboardComponent,
    Dashboard2Component,
    MdChartComponent,
    MdTableComponent,
    ImageViewerComponent,
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
    PopupBienvenidaComponent,
    HomeComponent,
    PopupCancelarPagoComponent,
    DashboardProductoComponent,
    PruebasImpComponent,
    DashboardPricingComponent,
    FooterComponent,
    Footer2Component,
    CabeceraComponent,
    PopupRecuperarPasswordComponent,
    PopupContraseniaTemporalComponent,    
    PopupErrorNewUsuarioComponent,
    PopupErrorPagoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
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
    NgxPayPalModule,
    BrowserAnimationsModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideAuth(()=>getAuth()),
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' },],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs);
  }
 }
