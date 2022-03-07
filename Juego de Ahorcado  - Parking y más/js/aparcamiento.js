const precioDia = 20;
const precioHoraInicial = 1.20;
const precioHora = 1.50;

const segundo = 1000;
const minuto = 60 * segundo;
const hora = 60 * minuto;
const dia = 24 * hora;

function calcular() {
    let entrada = document.getElementById('entrada').value;
    let salida = crearFechafechaSalida();
    document.getElementById('salida').value = salida;

    let precio = calcularPrecio(new Date(entrada), new Date(salida));

    document.getElementById('precio').value = precio;
}

function crearFechafechaSalida() {
    let fecha = new Date();
    let anio = fecha.getFullYear();

    let mes = fecha.getMonth() + 1;
    if (mes <= 9) 
        mes = `0${mes}`;

    let dia = fecha.getDate();
    if (dia <= 9)
        dia = `0${dia}`;

    let hora = fecha.getHours();
    if (hora <= 9) 
        hora = `0${hora}`;

    let minutos = fecha.getMinutes();
    if (minutos <= 9) 
        minutos = `0${minutos}`;

    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
}

function calcularPrecio(fechaEntrada, fechaSalida){
    let precio = 0;
    let entrada = fechaEntrada.getTime();
    let salida = fechaSalida.getTime();
    
    let tiempo = salida - entrada;
    

    if (tiempo <= hora)
        precio = precioHoraInicial;
    else if (tiempo > hora && tiempo < dia){
        precio = calcularPrecioHoras(tiempo);
    }
    else{
        let dias = tiempo / dia;
        dias = Math.round(dias);
        if (tiempo % dia != 0){
            let restante = tiempo - dia*dias;
            precio = dias * precioDia + calcularPrecioHoras(restante);
        }
        else   
            precio = dias * precioDia;

    }
    return precio;
}

function calcularPrecioHoras(tiempo){
    let horas = tiempo / hora;
        horas = Math.round(horas);
        if (tiempo%hora != 0){
            precio = precioHoraInicial + horas* precioHora;
            if(precio > precioDia)
                precio = precioDia;
        }
        else {
            precio = precioHoraInicial + (horas-1) * precioHora;
            if(precio > precioDia)
                precio = precioDia;
        }
    return precio;
}