import Swal from "sweetalert2"

export const swal = () => {
    Swal.fire({
        title: 'Usuario y/o contraseña invalida',
        text: 'Por favor, ingrese un usuario y/o contraseña validos',
        width:"400px",
        timer:10000,
        timerProgressBar:true,
        confirmButtonText: 'Aceptar'
    })
}