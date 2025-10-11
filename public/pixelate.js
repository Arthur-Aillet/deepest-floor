
function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

export class Pixelate {
  constructor(image, amount) {
    this.image = image;
    this.amount = amount;
    this.imageUrl = image.src;

    var imageLoaded = function () {
      this.width = image.clientWidth;
      this.height = image.clientHeight;

      this.canvas = document.createElement('canvas');
      this.canvas.style.display = 'none';
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
        'image-rendering: -moz-crisp-edges;' + // FireFox
        'image-rendering: -o-crisp-edges;' + // Opera
        'image-rendering: -webkit-crisp-edges;' + // Chrome
        'image-rendering: crisp-edges;' + // Chrome
        'image-rendering: -webkit-optimize-contrast;' + // Safari
        'image-rendering: pixelated; ' + // Future browsers
        '-ms-interpolation-mode: nearest-neighbor;';

      this.ctx = this.canvas.getContext('2d');
      this.ctx = disableSmoothRendering(this.ctx);

      this.image.parentNode.replaceChild(this.canvas, this.image);
      this.image.onload = null;

      this.pixelImage = new Image();
      this.pixelImage.onload = function () {
        this.ready = true;
        this.render();
      }.bind(this);
      this.pixelImage.src = this.imageUrl;
    }.bind(this);

    if (this.image.complete) {
      imageLoaded();
    }


    return this;
  }
  setAmount(amount) {
    this.amount = amount;
    return this;
  }
  setWidth(width) {
    var height = (this.height / this.width) * width;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = disableSmoothRendering(this.ctx);
    return this;
  }
  render() {
    if (!this.ready) return this;
    var w = this.width * (this.amount <= 0 ? 0.01 : this.amount);
    var h = this.height * (this.amount <= 0 ? 0.01 : this.amount);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.pixelImage, 0, 0, w, h);
    this.ctx.globalCompositeOperation = 'copy';
    this.ctx.drawImage(this.canvas, 0, 0, w, h, 0, 0, this.width, this.height);
    return this;
  }
}
