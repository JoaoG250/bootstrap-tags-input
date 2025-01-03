class BootstrapInputController {
  readonly inputElement: HTMLInputElement;

  /**
   * Initializes an instance of the InputController class.
   * @param {HTMLInputElement} inputElement The input element to control.
   */
  constructor(inputElement: HTMLInputElement) {
    this.inputElement = inputElement;
  }

  /**
   * Retrieves the tags from the input element.
   * @returns {string[]} An array of tags split by commas, or an empty array if no tags are present.
   */
  getTags() {
    if (this.inputElement.value) {
      return this.inputElement.value.split(",");
    }
    return [];
  }

  /**
   * Sets the tags in the input element.
   * @param {string[]} tags An array of tags to set.
   */
  setTags(tags: string[]) {
    this.inputElement.value = tags.join(",");
  }

  /**
   * Handles the addition of a tag to the input element. Retrieves the tags in the input element,
   * adds the provided tag to the array, and sets the tags in the input element.
   * @param {string} tag The tag to add.
   */
  addTag(tag: string) {
    const tags = this.getTags();
    tags.push(tag);
    this.setTags(tags);
  }

  /**
   * Handles the removal of a tag from the input element. Retrieves the tags in the input element,
   * filters out the provided tag from the array, and sets the tags in the input element.
   * @param {string} tag The tag to remove.
   */
  removeTag(tag: string) {
    const tags = this.getTags();
    this.setTags(tags.filter((t) => t !== tag));
  }
}

export default BootstrapInputController;
