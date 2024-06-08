import { ChangePasswordComponent } from './../../components/profile-page/change-password/change-password.component';
import { Component } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { ProfileCardComponent } from '../../components/profile-page/profile-card/profile-card.component';
import { BorderedTabsComponent } from '../../components/profile-page/bordered-tabs/bordered-tabs.component';
import { ProfileOverviewComponent } from '../../components/profile-page/profile-overview/profile-overview.component';
import { EditProfileComponent } from '../../components/profile-page/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    PageTitleComponent,
    ProfileCardComponent,
    BorderedTabsComponent,
    ProfileOverviewComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
