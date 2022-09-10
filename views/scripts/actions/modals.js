let addModal = document.getElementById("modal-add")
let pseudoModal = document.getElementById("modal-pseudo")

const showAddModal = () => {
  addModal.style.display = "block"
}

const hideAddModal = () => {
  addModal.style.display = "none"
}

const showPseudoModal = () => {
  pseudoModal.style.display = "block"
}

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
  choosePseudo
}
