import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./feature/user/user-list/user-list.component";
import { MenuComponent } from "./core/menu/menu.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "./feature/base/base.component";
import { SortPipe } from "./pipe/sort.pipe";
import { ChartsModule } from "ng2-charts";
import { UserCreateComponent } from "./feature/user/user-create/user-create.component";
import { UserEditComponent } from "./feature/user/user-edit/user-edit.component";
import { UserDetailComponent } from "./feature/user/user-detail/user-detail.component";
import { VendorListComponent } from "./feature/vendor/vendor-list/vendor-list.component";
import { VendorDetailComponent } from "./feature/vendor/vendor-detail/vendor-detail.component";
import { VendorEditComponent } from "./feature/vendor/vendor-edit/vendor-edit.component";
import { VendorCreateComponent } from "./feature/vendor/vendor-create/vendor-create.component";
import { ProductListComponent } from "./feature/product/product-list/product-list.component";
import { ProductCreateComponent } from "./feature/product/product-create/product-create.component";
import { ProductDetailComponent } from "./feature/product/product-detail/product-detail.component";
import { ProductEditComponent } from "./feature/product/product-edit/product-edit.component";
import { RequestListComponent } from "./feature/request/request-list/request-list.component";
import { FooterComponent } from "./core/footer/footer.component";
import { UserLoginComponent } from "./feature/user/user-login/user-login.component";
import { RequestCreateComponent } from "./feature/request/request-create/request-create.component";
import { RequestDetailComponent } from "./feature/request/request-detail/request-detail.component";
import { RequestEditComponent } from "./feature/request/request-edit/request-edit.component";
import { RequestLinesComponent } from "./feature/request/request-lines/request-lines.component";
import { LineItemCreateComponent } from "./feature/line-item/line-item-create/line-item-create.component";
import { LineItemEditComponent } from "./feature/line-item/line-item-edit/line-item-edit.component";
import { RequestReviewComponent } from "./feature/request/request-review/request-review.component";
import { RequestApproveComponent } from "./feature/request/request-approve/request-approve.component";
import { RequestReportingComponent } from './feature/request/request-reporting/request-reporting.component';
import { AboutComponent } from './core/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MenuComponent,
    BaseComponent,
    SortPipe,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    VendorListComponent,
    VendorDetailComponent,
    VendorEditComponent,
    VendorCreateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    RequestListComponent,
    FooterComponent,
    UserLoginComponent,
    RequestCreateComponent,
    RequestDetailComponent,
    RequestEditComponent,
    RequestLinesComponent,
    LineItemCreateComponent,
    LineItemEditComponent,
    RequestReviewComponent,
    RequestApproveComponent,
    RequestReportingComponent,
    AboutComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
