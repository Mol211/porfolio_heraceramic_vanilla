export function initForm () {
    const filter = document.querySelector("#select-asunto");
    const nomb = document.getElementById('input-name');
    const mail = document.getElementById('input-mail');
    const msg = document.getElementById('input-msg');
    const form = document.getElementsByClassName('contact-form')[0];

    if(!form) return;

    // form.addEventListener('click', () => {
    //     const objetivo = event.target;
    //     if (!/^[A-Za-z][a-z]+$/.test(nomb)) {
    //         alert("Nombre Introudzca un nombre correcto");

    //     } else if (objetivo === mail) {
    //         prompt(mail.value);
    //     } else if (objetivo === msg) {
    //         alert(msg.value);
    //     } else if(objetivo ===filter) {
    //         alert(filter.value);
    //     }
    // });
    function validar(){
    return validarNombre();
    // validarMail();
    // validarAsunto();
    // validarMensaje();
}
function validarNombre() {
        const nombre = nomb.value;
        let valido = false;
        valido = !/^\s+$/.test(nombre);
        if (!valido)  return console.log("No puede introducir espacios en blanco");
        valido = !/^$/.test(nombre);
        if (!valido) return console.log("Introduzca un nombre");
        valido = !/^[0-9].*$/.test(nombre);
        if(!valido) return console.log("El nombre no puede empezar por un numero")
        
        valido = /^[A-Za-záéóíú][a-záéóíú]{2,}(\s[A-Za-záéóíú][a-záéóíú]{2,})?$/.test(nombre);
        console.log(
            valido ? "Nombre OK" : "Introduce nombre valido"
        )
        return valido;
    }
form.addEventListener('submit', (event)=>{
    validarNombre();
    event.preventDefault(); 
})

}
