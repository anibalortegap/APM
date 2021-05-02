import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _listFilter: string = '';
  pageTitle: string = 'Product List';
  showImage: boolean = false;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string = '';
  sub!: Subscription;
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.perfomFilter(value);
  }

  perfomFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    console.log('FilterBy:', filterBy);
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  showToggle(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List ${message}`;
  }
  ngOnInit(): void {
    this.sub = this.productService.getProduct().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
