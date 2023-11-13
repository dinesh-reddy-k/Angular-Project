import { Routes,RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
    // {path: '', component: DetailsComponent},
    { path: 'login', component: DetailsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'search', component: SearchComponent},
    { path: 'info/:id', component: InfoComponent}
];
