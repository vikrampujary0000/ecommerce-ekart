import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGaurd } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGaurd] },
    { path: 'admin/categories', component: CategoriesComponent, canActivate: [adminGuard] },
    { path: 'admin/categories/add', component: CategoryFormComponent, canActivate: [adminGuard] },
    { path: 'admin/categories/:id', component: CategoryFormComponent, canActivate: [adminGuard] },
    { path: 'admin/brands', component: BrandsComponent, canActivate: [adminGuard] },
    { path: 'admin/brands/add', component: BrandFormComponent, canActivate: [adminGuard] },
    { path: 'admin/brands/:id', component: BrandFormComponent, canActivate: [adminGuard] },
    { path: 'admin/products', component: ProductsComponent, canActivate: [adminGuard] },
    { path: 'admin/products/add', component: ProductFormComponent, canActivate: [adminGuard] },
    { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [adminGuard] },
    { path: 'admin/orders', component: OrdersComponent, canActivate: [adminGuard] },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'profile', component: CustomerProfileComponent, canActivate: [adminGuard] },
    { path: 'wishlists', component: WishlistsComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'orders', component: CustomerOrdersComponent },
    { path: 'products', component: ProductListComponent, canActivate: [authGaurd] },
    { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGaurd] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];