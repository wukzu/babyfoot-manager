let addModal = document.getElementById("modal-add")
let pseudoModal = document.getElementById("modal-pseudo")

/**
 * Method to show the modal for adding a match.
 */
const showAddModal = () => {
  addModal.style.display = "block"
}
/**
 * Method to hide the modal for adding a match.
 */
const hideAddModal = () => {
  addModal.style.display = "none"
}

/**
 * Method to show the modal to chose the pseudo.
 */
const showPseudoModal = () => {
  pseudoModal.style.display = "block"
}

/**
 * Method to close the modal to choose the pseudo.
 * @param {Function} callback - The callback function.
 */
const choosePseudo = (callback) => {
  const pseudoInput = document.getElementById("pseudoInput")
  if (pseudoInput.value) {
    pseudoModal.style.display = "none"
    callback(pseudoInput.value)
  }
}

export default {
  showAddModal,
  hideAddModal,
  showPseudoModal,
  choosePseudo,
}
