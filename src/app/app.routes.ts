import { Routes } from '@angular/router';
import { hotels } from './hotels/hotels';
import { RechercheParClassification } from './recherche-par-classification/recherche-par-classification';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom';
import { Updatehotel } from './update-hotel/update-hotel';
import { Addhotel } from './add-hotel/add-hotel';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { hotelGuard } from './hotel-guard';
import { ListeClassifications } from './liste-classifications/liste-classifications';

export const routes: Routes = [
    {path: "hotels", component : hotels},
    {path: "add-hotel", component : Addhotel , canActivate: [hotelGuard]},
    {path: "", redirectTo: "hotels", pathMatch: "full"},
    {path: "rechercheParClassification", component : RechercheParClassification},
    {path: "rechercheParNom", component : RechercheParNomComponent},
    {path: "updatehotel/:id",  component: Updatehotel},
    {path:  'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: 'liste-classifications', component: ListeClassifications},

];
