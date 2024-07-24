import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PaymentComponent } from './payment/payment.component';
import { PerfilUsuarioComponent } from './settings-user/settings-usuario.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { ProductosComponent } from './productos/productos.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { AuthGuard } from './services/auth.guard'; 
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { OrdenProductosComponent } from './orden-productos/orden-productos.component'; 
import { FormularioPagoComponent } from './formulario-pago/formulario-pago.component';
import { MenuComponent } from './menu/menu.component';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { HomeComponent } from './home/home.component';
import { DashboardProductoComponent } from './dashboard-producto/dashboard-producto.component';
import { PruebasImpComponent } from './pruebas-imp/pruebas-imp.component';
import { DashboardPricingComponent } from './dashboard-pricing/dashboard-pricing.component';
import { PopupBienvenidaComponent } from './popup-bienvenida/popup-bienvenida.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PoliticasPrivacidadComponent } from './politicas-privacidad/politicas-privacidad.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FooterComponent } from './footer/footer.component';
import { PopupRecuperarPasswordComponent } from './popup-recuperar-password/popup-recuperar-password.component';
import { PopupContraseniaTemporalComponent } from './popup-contrasenia-temporal/popup-contrasenia-temporal.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cabecera', component: CabeceraComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard2', component: Dashboard2Component  },
  {path: 'login', component: LoginComponent},
  {path: 'mis-productos', component: HomeComponent},
  {path: 'home', component: ProductosComponent},
  {path: 'dashboard-producto/:id', component: DashboardProductoComponent  },
  {path: 'dashboard-pricing/:id', component: DashboardPricingComponent  },
  {path: 'perfil-usuario', component: PerfilUsuarioComponent},
  {path: 'facturacion', component: FacturacionComponent},
  {path: 'new-user', component: NewUserComponent},
  // {path: 'payment', component: PaymentComponent},
  //{path: 'membresias', component: MembresiasComponent},
  //{path: 'productos', component: ProductosComponent},
  {path: 'pruebas', component: PruebasComponent},
  {path: 'detalle-producto/:id', component: DetalleProductoComponent},
  {path: 'orden-productos', component: OrdenProductosComponent},
  {path: 'formulario-pago',component: FormularioPagoComponent},
  {path: 'menu',component:MenuComponent},
  {path: 'detalle-factura/:id',component:DetalleFacturaComponent},
  {path: 'pruebas-imp',component:PruebasImpComponent},
  {path: 'bienvenida',component:PopupBienvenidaComponent},
  {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
  {path: 'politicas-privacidad', component: PoliticasPrivacidadComponent},
  {path: 'popup-recuperarc',component: PopupRecuperarPasswordComponent},
  {path: 'popup-ctemporal',component: PopupContraseniaTemporalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }