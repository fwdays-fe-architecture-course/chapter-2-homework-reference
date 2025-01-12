import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-about-us',
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold">About Us</h1>
      <p class="mt-4">
        Welcome to our task management application! We aim to help you organize
        and prioritize your tasks efficiently.
      </p>
    </div>
  `
})
export class AboutUsComponent {}
