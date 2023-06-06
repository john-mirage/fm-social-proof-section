class WebReview extends HTMLLIElement {
  private hasBeenMountedOnce = false;
  private template;
  private companyElement;
  private valueElement;
  private ratingElement;
  [key: string]: any;

  protected static get observedAttributes() {
    return ["data-company", "data-value"];
  }

  public constructor() {
    super();
    const template = <HTMLTemplateElement>(
      document.getElementById("template-review")
    );
    this.template = <DocumentFragment>template.content.cloneNode(true);
    this.companyElement = <HTMLSpanElement>(
      this.template.querySelector('[data-js="company"]')
    );
    this.valueElement = <HTMLSpanElement>(
      this.template.querySelector('[data-js="value"]')
    );
    this.ratingElement = <HTMLDivElement>(
      this.template.querySelector('[data-js="rating"]')
    );
  }

  public get dataCompany(): string | undefined {
    return this.dataset.company;
  }

  public set dataCompany(newCompany: string | undefined) {
    this.dataset.company = newCompany;
  }

  public get dataValue(): string | undefined {
    return this.dataset.value;
  }

  public set dataValue(newValue: string | undefined) {
    this.dataset.value = newValue;
  }

  private handleCompany(newCompany: string | undefined) {
    this.companyElement.textContent = newCompany ?? "";
  }

  private handleValue(
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    this.valueElement.textContent = newValue ?? "";
    if (oldValue) {
      this.ratingElement.classList.remove(`rating--${oldValue}-of-5`);
    }
    if (newValue) {
      this.ratingElement.classList.add(`rating--${newValue}-of-5`);
    } else {
      this.ratingElement.classList.add(`rating--0-of-5`);
    }
  }

  private upgradeProperty(propertyName: string) {
    if (this.hasOwnProperty(propertyName)) {
      const value = this[propertyName];
      delete this[propertyName];
      this[propertyName] = value;
    }
  }

  protected connectedCallback() {
    if (!this.hasBeenMountedOnce) {
      this.upgradeProperty("dataCompany");
      this.upgradeProperty("dataValue");
      this.classList.add("review");
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
        case "data-company": {
          this.handleCompany(newValue);
          break;
        }
        case "data-value": {
          this.handleValue(oldValue, newValue);
          break;
        }
      }
    }
  }
}

export default WebReview;
