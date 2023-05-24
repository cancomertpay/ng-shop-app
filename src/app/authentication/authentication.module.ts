import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild([
            { path: 'auth', component: AuthComponent }
        ])
    ],
    exports: [
        AuthComponent
    ]
})

export class AuthenticationModule {

}