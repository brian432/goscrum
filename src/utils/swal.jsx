import Swal from "sweetalert2"

export const swal = () => {
    Swal.fire({
        title: 'Usuario y/o contraseña invalida',
        text: 'Por favor, ingrese un usuario y/o contraseña validos',
        width: "400px",
        timer: 10000,
        timerProgressBar: true,
        confirmButtonText: 'Aceptar'
    })
}

export const swalRegisterFalse = () => {
    Swal.fire({
        title: 'El usuario o el email ya estan registrados',
        text: 'Intentelo nuevamente',
        width: "400px",
        timer: 10000,
        timerProgressBar: true,
        confirmButtonText: 'Aceptar'
    })
}

export const swalRegisterTrue = () => {
    Swal.fire({
        title: 'Usuario creado correctamente',
        width: "400px",
        timer: 10000,
        timerProgressBar: true,
        confirmButtonText: 'Aceptar'
    })
}