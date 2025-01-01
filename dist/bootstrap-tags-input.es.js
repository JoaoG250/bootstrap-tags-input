var d = Object.defineProperty;
var l = (i, t, e) => t in i ? d(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var s = (i, t, e) => l(i, typeof t != "symbol" ? t + "" : t, e);
class h {
  /**
   * Initializes a new instance of the BootstrapTagsInput class.
   * The options object contains the following properties:
   * - onTagAdded: The function to call when a tag is added. The function receives the added tag as a string argument.
   * - onTagRemoved: The function to call when a tag is removed. The function receives the removed tag as a string argument.
   * - initialTags: The initial tags to display in the input element.
   * - rootElementClass: The CSS class to apply to the root element.
   * - inputElementClass: The CSS class to apply to the input element.
   * - tagClass: The CSS class to apply to each tag element.
   */
  constructor({
    onTagAdded: t = () => {
    },
    onTagRemoved: e = () => {
    },
    initialTags: n = [],
    rootElementClass: r = "",
    inputElementClass: a = "",
    tagClass: o = "badge text-bg-secondary"
  }) {
    s(this, "onTagAdded", () => {
    });
    s(this, "onTagRemoved", () => {
    });
    s(this, "tags", []);
    s(this, "rootElementId");
    s(this, "rootElement");
    s(this, "rootElementClass");
    s(this, "inputId");
    s(this, "inputElement");
    s(this, "inputElementClass");
    s(this, "tagClass");
    this.onTagAdded = t, this.onTagRemoved = e, this.tags = n, this.rootElementClass = r, this.inputElementClass = a, this.tagClass = o, this.rootElementId = this.generateUniqueId(), this.rootElement = this.renderRootElement(this.rootElementId), this.inputId = this.generateUniqueId(), this.inputElement = this.renderInput(this.inputId), this.rootElement.appendChild(this.inputElement), this.addEnventListeners(), this.renderInitialTags();
  }
  /**
   * Generates a random, URL-safe, unique identifier.
   * @param {number} [length=8] The length of the identifier to generate.
   * @returns {string} A random, URL-safe, unique identifier.
   */
  generateUniqueId(t = 8) {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = e.length, r = new Uint8Array(t);
    return window.crypto.getRandomValues(r), Array.from(
      r,
      (a) => e[a % n]
    ).join("");
  }
  /**
   * Renders the root element of the Bootstrap tags input.
   * The root element is the outermost element that contains the input element and the tag elements.
   * The root element is assigned an ID in the format "bootstrap-tags-input-<idSuffix>".
   * The root element is also assigned a CSS class "bootstrap-tags-input" and any additional classes specified in the options object.
   * @param {string} idSuffix A string to append to the end of the root element's ID.
   * @returns {HTMLDivElement} The rendered root element.
   */
  renderRootElement(t) {
    return this.renderElementFromString(`
      <div id="bootstrap-tags-input-${t}" class="bootstrap-tags-input ${this.rootElementClass}"></div>
    `);
  }
  /**
   * Parses an HTML string and returns the first element as a specified HTMLElement type.
   * @template T - The type of HTMLElement to return.
   * @param {string} htmlString - The HTML string to parse.
   * @returns {T} The first HTML element parsed from the string.
   */
  renderElementFromString(t) {
    return new DOMParser().parseFromString(t, "text/html").body.firstElementChild;
  }
  /**
   * Renders the input element of the Bootstrap tags input.
   * The input element is the text input where the user enters tags.
   * The input element is assigned an ID in the format "bootstrap-tag-input-<idSuffix>".
   * The input element is also assigned a CSS class "bootstrap-tag-input" and any additional classes specified in the options object.
   * @param {string} idSuffix A string to append to the end of the input element's ID.
   * @returns {HTMLInputElement} The rendered input element.
   */
  renderInput(t) {
    return this.renderElementFromString(`
      <input id="bootstrap-tag-input-${t}" type="text" class="${this.inputElementClass}">
    `);
  }
  /**
   * Adds event listeners to the rendered elements. This method is called by the constructor.
   */
  addEnventListeners() {
    this.addRootElementEventListener(), this.addInputEventListener();
  }
  /**
   * Adds an event listener to the root element to focus the input element when the root element is clicked.
   */
  addRootElementEventListener() {
    this.rootElement.addEventListener("click", () => {
      this.inputElement.focus();
    });
  }
  /**
   * Adds an event listener to the input element to add a tag when the Enter key is pressed.
   * When the Enter key is pressed, the input element's value is added as a tag if it is not already present.
   * The input element's value is then cleared.
   */
  addInputEventListener() {
    this.inputElement.addEventListener("keydown", (t) => {
      if (t.key === "Enter") {
        t.preventDefault();
        const e = this.inputElement.value.trim();
        if (e && !this.tags.includes(e)) {
          this.tags.push(e), this.onTagAdded(e);
          const n = this.renderTag(e);
          this.addTag(n);
        }
        this.inputElement.value = "";
      }
    });
  }
  /**
   * Adds a tag element to the Bootstrap tags input.
   * @param {HTMLElement} tagElement The tag element to add.
   */
  addTag(t) {
    this.rootElement.insertBefore(t, this.inputElement);
  }
  /**
   * Renders a tag element from a string.
   * @param {string} text The text content of the tag element.
   * @returns {HTMLElement} The rendered tag element.
   */
  renderTag(t) {
    const e = document.createElement("span");
    e.className = `bootstrap-tag ${this.tagClass}`, e.textContent = t;
    const n = document.createElement("span");
    return n.classList.add("bootstrap-tag-remove-btn"), n.onclick = () => {
      this.tags = this.tags.filter((r) => r !== t), this.onTagRemoved(t), e.remove();
    }, e.appendChild(n), e;
  }
  /**
   * Renders the initial tags for the Bootstrap tags input.
   * This method is called by the constructor.
   */
  renderInitialTags() {
    this.tags.forEach((t) => {
      const e = this.renderTag(t);
      this.addTag(e);
    });
  }
}
class g {
  /**
   * Initializes an instance of the InputController class.
   * @param {HTMLInputElement} inputElement The input element to control.
   */
  constructor(t) {
    s(this, "inputElement");
    this.inputElement = t;
  }
  /**
   * Retrieves the tags from the input element.
   * @returns {string[]} An array of tags split by commas, or an empty array if no tags are present.
   */
  getTags() {
    return this.inputElement.value ? this.inputElement.value.split(",") : [];
  }
  /**
   * Sets the tags in the input element.
   * @param {string[]} tags An array of tags to set.
   */
  setTags(t) {
    this.inputElement.value = t.join(",");
  }
  /**
   * Handles the addition of a tag to the input element. Retrieves the tags in the input element,
   * adds the provided tag to the array, and sets the tags in the input element.
   * @param {string} tag The tag to add.
   */
  addTag(t) {
    const e = this.getTags();
    e.push(t), this.setTags(e);
  }
  /**
   * Handles the removal of a tag from the input element. Retrieves the tags in the input element,
   * filters out the provided tag from the array, and sets the tags in the input element.
   * @param {string} tag The tag to remove.
   */
  removeTag(t) {
    const e = this.getTags();
    this.setTags(e.filter((n) => n !== t));
  }
}
window.BootstrapTagsInput = h;
window.BootstrapInputController = g;
