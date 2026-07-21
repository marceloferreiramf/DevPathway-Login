document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const inputUsuario = document.getElementById("username");
    
    if (inputUsuario && inputUsuario.value.trim() !== "") {
        const usuario = inputUsuario.value;
        alert("Bem-vindo de volta, " + usuario + "!");
    }
});