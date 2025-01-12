import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="p-8">
      <nav class="mb-4">
        <a routerLink="/" class="mr-4 text-blue-500 hover:underline">Home</a>
        <a routerLink="/about-us" class="text-blue-500 hover:underline">About Us</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {}
