// CONSTRUCTORS

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {
}


// PROTOTYPES
// puedo usar arrow functions porque no necesito acceder a ninguna propiedad
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;
    
    const selectYear = document.querySelector('#year');
;
    for(let i = max; i > min; i --) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


// realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(marca, year, tipo) {
    /*  
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 =Europero 1.35
    */

    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break
    }

    console.log(cantidad);
    // leer el anio
    // cada anio que la diferencia es mayor, el costo debe reducirse un 3%

    let diferencia = new Date().getFullYear() - parseInt(this.year);
    cantidad  -= (diferencia * 3) * cantidad / 100;

    console.log(cantidad);

    /*
        Si el seguro es basico, se multiplica por un 30% mas
        Si el seguro es completo, se multiplica por un 50% mas
    */

    switch (this.tipo) {
        case 'basico':
            cantidad = cantidad * 1.30;
            break;
        case 'completo':
            cantidad = cantidad * 1.50;
            break;
        default:
            break;
    }



    return cantidad;

}


// muertra alerta en el html
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error')
    } else {
        div.classList.add('correcto')
    }
    div.classList.add('mensaje');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');

    formulario.insertBefore(div, document.querySelector('#resultado'))

    // eliminar el mensaje despues de 3 seg
    setTimeout(() => {
        div.remove()
    }, 3000);
    
} 

UI.prototype.mostrarResultado = (total, seguro) => {
    
    const { marca, year, tipo} = seguro;

    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break;
        case '2':
            textoMarca = 'Asiatico'
            break;
        case '3':
            textoMarca = 'Europeo'
            break;

        default:
            break;
    }




    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class = 'header'>Tu resumen</>
        <p class = 'font-bold'>Marca: <span class= 'font-normal'>${textoMarca}</span></>
        <p class = 'font-bold'>Año: <span class= 'font-normal'>${year}</span></>
        <p class = 'font-bold capitalize'>Tipo: <span class= 'font-normal'>${tipo}</span></>
        <p class = 'font-bold'>Total: <span class= 'font-normal'>$${total}</span></>

    `
    const resultadoDiv = document.querySelector('#resultado')
    

    // mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    spinner.hidden = false;
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);

}

UI.prototype.limpiarHTML = () => {
    const resultadoDiv = document.querySelector('#resultado')
    if(resultadoDiv.firstChild) {
        resultadoDiv.firstChild.remove()
        return
    }
}







// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // llena el select con los años

})


eventListeners();


function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // leer el anio seleccionado
    const year = document.querySelector('#year').value;
    // leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo);
    
    // validar los inputs
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligaorios', 'error');
        return
    } 
    ui.mostrarMensaje('Cotizando...', 'exito')


    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }



    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);

    // cotizar seguro
    const total = seguro.cotizarSeguro(marca, year, tipo)

    // Utilizar el protoype que va a cotizar

    ui.mostrarResultado(total, seguro);
    

    

}




// INSTANCIAR UI
const ui = new UI();