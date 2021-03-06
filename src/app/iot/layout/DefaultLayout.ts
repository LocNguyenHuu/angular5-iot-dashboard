import { NavigationComponent } from '@app/core/navigation/navigation.component';
import { QuickStatusComponent } from '@app/iot/quick-status/quick-status.component';
import { AppInfoComponent } from '@app/iot/app-info/app-info.component';
import { Route } from '@angular/router';
import { DefaultLayoutComponent } from '@app/iot/default-layout/default-layout.component';
import { AuthGuard } from '@app/core/services/user.service';
import { environment } from '../../../environments/environment';

const SidebarOutlets = [
    {
        path: '',
        outlet: 'navigation',
        component: NavigationComponent
    },
    {
        outlet: 'quick-status',
        path: '',
        component: QuickStatusComponent
    },
    {
        outlet: 'app-info',
        path: '',
        component: AppInfoComponent
    }
];

export function AuthLayout (component: any, route: string, options: any = {}): Route {
    return {
        path: route,
        ... options,
        canActivate: environment.production ? [AuthGuard] : [],
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                component: component
            },
            ...SidebarOutlets
        ],
    };
}
export function DefaultLayout (component: any, route: string, options: any = {}): Route {
    return {
        path: route,
        ... options,
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                component: component
            },
            ...SidebarOutlets
        ],
    };
}
