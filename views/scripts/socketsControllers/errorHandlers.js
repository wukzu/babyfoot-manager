import constants from "../../constants.js"

export default (messageObj) => {
  if (messageObj.data && messageObj.data.message) {
    const sectionErrors = document.getElementById("errors")
    sectionErrors.innerHTML += `
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
      <strong>Erreur</strong> ${messageObj.data.message}
    </div>
    
    `
  }
}
