import { Component, OnInit } from '@angular/core';
import { UserLogged } from '../../../models/user-logged';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss'
})
export class ProfileOverviewComponent implements OnInit{
  camposPerfil:{ label: string; value: string; }[] = [];
  usuario?: UserLogged ;

  constructor(
    private authService: AuthService,
  ){
    this.usuario = this.authService.getUsuarioLogado();
  }

  ngOnInit() {
    this.setCamposPerfil();
  }

  setCamposPerfil(){
    if (this.usuario) {
      this.camposPerfil.push(
        { label: 'Nome Completo', value: this.usuario.name },
        { label: 'Empresa', value: this.usuario.company },
        { label: 'Cargo', value: this.usuario.jobTitle },
        { label: 'Cidade', value: this.usuario.city },
        { label: 'Endereço', value: this.usuario.address},
        { label: 'Telefone', value: this.usuario.phone },
        { label: 'E-mail', value: this.usuario.email }
      )
    }
  }

}
