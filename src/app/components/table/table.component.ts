import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { RequestService } from '../../services/request.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnInit {
  @Input() dataList: T[] = [];
  @Input() pageSizes: number[]=[];
  @Input() displayedColumns: TableColumn<T>[] = [];
  @Input() buttons: ButtonModel[]= [];
  @Input() searchFor?: string;
  @Input() searchIn?: string;

  @Output() editItem = new EventEmitter<T>();
  @Output() removeItem = new EventEmitter<T>();

  columnSortOrder: { [key: string]: string} = {};
  _buscaPor!: string;
  filteredData: T[] = [];
  currentPage = 1; // Página atual
  totalItems = 0; // Total de itens
  selectedPageSize: number = 10; // Valor padrão selecionado
  searchField!: string;
  totalPages: number =0;
  constructor(
    public requestService: RequestService
  ) { }

  ngOnInit() {
    this.updateFilteredData();
    if(this.searchFor){
      this.searchField= this.searchIn||"";
      this.busca= this.searchFor;
    }
  }

  set busca(value: string) {
    this._buscaPor = value;
    if(this.searchField){
      this.filteredData = this.dataList.filter(
        (item: T)=>String(item[this.searchField as keyof T]).toLowerCase().includes(this._buscaPor.toLowerCase()));
    }
  }

  get busca() {
    return this._buscaPor;
  }


  updateFilteredData(): void {
    let filtered = this.dataList;

    if (this.busca) {
      if (this.searchField) {
        const fieldToSearch = this.searchField;
        filtered = this.dataList.filter((item: T) => {
          const fieldValue = fieldToSearch.toLowerCase();
          return fieldValue.includes(this.busca.toLowerCase());
        });
      } else {
        filtered = this.dataList.filter((item: T) => {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const fieldValue = String(item[key]).toLowerCase();
              if (fieldValue.includes(this.busca.toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        });
      }
    }
   // Atualiza o total de itens com base na filtragem
    this.totalItems = filtered.length;

    // Calcula o índice inicial e final dos itens a serem exibidos na página atual
    const startIndex = (this.currentPage - 1) * this.selectedPageSize;
    const endIndex = Math.min(startIndex + this.selectedPageSize, this.totalItems);

    this.filteredData = filtered.slice(startIndex, endIndex);

  }

  sortData(column: TableColumn<T>) {
     // Verifica se a coluna clicada é a mesma que a coluna atualmente classificada
    if (this.displayedColumns.includes(column)) {
      // Verifica se já houve uma ordenação nesta coluna
      if (!this.columnSortOrder[column.label] || this.columnSortOrder[column.label] === 'asc') {
        this.filteredData.sort((a: T, b: T) => {
          return this.sortByColumn(column, a, b);
        });
        // Atualiza o estado de ordenação para 'desc' após ordenação crescente
        this.columnSortOrder[column.label] = 'desc';
      } else {
        // Ordenação decrescente caso a mesma coluna seja clicada novamente
        this.filteredData.sort((a: T, b: T) => {
          return this.sortByColumn(column, b, a); // Troca a e b para ordem decrescente
        });
        // Atualiza o estado de ordenação para 'asc' após ordenação decrescente
        this.columnSortOrder[column.label] = 'asc';
      }

    }

  }


  sortByColumn(column: TableColumn<T>, a: T, b: T): number {
    type ValueOf<T> = T[keyof T];
    if (column.label) {
      const valueA = a[column.value as keyof T] as ValueOf<T>;
      const valueB = b[column.value as keyof T] as ValueOf<T>;

      if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
      } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
          return valueA === valueB ? 0 : valueA ? 1 : -1;
      } else {
          return 0; // Default comparison
      }
    } else {
      return 0;
    }
  }

  emitButtonClick(buttonFunction: Function, item: T): void {
    buttonFunction(item);
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.selectedPageSize);
    this.totalPages=pageCount;
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.selectedPageSize)) {
      this.currentPage = page;
      this.updateFilteredData();
    }
  }

  onPageSizeChange() {
    this.changePage(1);
  }

  goToPrevious(){
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNext(){
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
      }
  }
}
