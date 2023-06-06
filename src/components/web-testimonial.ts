class WebTestimonial extends HTMLLIElement {
  private hasBeenMountedOnce = false;
  private template;
  private imageElement;
  private nameElement;
  private statusElement;
  private messageElement;
  [key: string]: any;

  protected static get observedAttributes() {
    return ["data-picture", "data-name", "data-status", "data-message"];
  }

  public constructor() {
    super();
    const template = <HTMLTemplateElement>(
      document.getElementById("template-testimonial")
    );
    this.template = <DocumentFragment>template.content.cloneNode(true);
    this.imageElement = <HTMLImageElement>(
      this.template.querySelector('[data-js="image"]')
    );
    this.nameElement = <HTMLHeadingElement>(
      this.template.querySelector('[data-js="name"]')
    );
    this.statusElement = <HTMLParagraphElement>(
      this.template.querySelector('[data-js="status"]')
    );
    this.messageElement = <HTMLParagraphElement>(
      this.template.querySelector('[data-js="message"]')
    );
  }

  public get dataPicture(): string | undefined {
    return this.dataset.picture;
  }

  public set dataPicture(newPicture: string | undefined) {
    this.dataset.picture = newPicture;
  }

  public get dataName(): string | undefined {
    return this.dataset.name;
  }

  public set dataName(newName: string | undefined) {
    this.dataset.name = newName;
  }

  public get dataStatus(): string | undefined {
    return this.dataset.status;
  }

  public set dataStatus(newStatus: string | undefined) {
    this.dataset.status = newStatus;
  }

  public get dataMessage(): string | undefined {
    return this.dataset.message;
  }

  public set dataMessage(newMessage: string | undefined) {
    this.dataset.message = newMessage;
  }

  private upgradeProperty(propertyName: string) {
    if (this.hasOwnProperty(propertyName)) {
      const value = this[propertyName];
      delete this[propertyName];
      this[propertyName] = value;
    }
  }

  private handlePicture(newPicture: string | undefined) {
    this.imageElement.src = newPicture ?? "";
  }

  private handleName(newName: string | undefined) {
    this.nameElement.textContent = newName ?? "";
    this.imageElement.alt = newName ?? "";
  }

  private handleStatus(newStatus: string | undefined) {
    this.statusElement.textContent = newStatus ?? "";
  }

  private handleMessage(newMessage: string | undefined) {
    this.messageElement.textContent = newMessage ?? "";
  }

  protected connectedCallback() {
    if (!this.hasBeenMountedOnce) {
      this.upgradeProperty("dataPicture");
      this.upgradeProperty("dataName");
      this.upgradeProperty("dataStatus");
      this.upgradeProperty("dataMessage");
      this.classList.add("testimonial");
      this.replaceChildren(this.template);
      this.hasBeenMountedOnce = true;
    }
  }

  protected attributeChangedCallback(
    name: string,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-picture": {
          this.handlePicture(newValue);
          break;
        }
        case "data-name": {
          this.handleName(newValue);
          break;
        }
        case "data-status": {
          this.handleStatus(newValue);
          break;
        }
        case "data-message": {
          this.handleMessage(newValue);
          break;
        }
      }
    }
  }
}

export default WebTestimonial;
