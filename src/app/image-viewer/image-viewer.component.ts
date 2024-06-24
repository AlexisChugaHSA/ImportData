import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  template: `
    <div class="image-viewer">
      <div class="image-viewer-overlay" (click)="closeImageViewer()"></div>
      <div class="image-viewer-content">
        <div class="image-viewer-buttons">
          <button (click)="previousImage()">Anterior</button>
          <button (click)="nextImage()">Siguiente</button>
          <button (click)="closeImageViewer()">Cerrar</button>
        </div>
        <img [src]="images[currentIndex]" alt="Image" class="image-viewer-img">
      </div>
    </div>
  `,
  styles: [`
    .image-viewer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .image-viewer-content {
      position: relative;
      text-align: center;
    }
    .image-viewer-img {
      max-width: 90%;
      max-height: 80%;
      margin-top: 50px; /* Adjusted to provide space for buttons */
    }
    .image-viewer-buttons {
      position: absolute;
      top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 10px; /* Adjust gap to make buttons closer */
    }
    .image-viewer-buttons button {
      background: #FF764B;
      color: white;
      border: none;
      padding: 10px;
      margin: 0 5px; /* Adjust margin to reduce space between buttons */
      cursor: pointer;
    }
  `]
})
export class ImageViewerComponent {
  @Input() images: string[] = [];
  @Input() currentIndex: number = 0;
  @Output() close = new EventEmitter<void>();

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  closeImageViewer() {
    this.close.emit();
  }
}
