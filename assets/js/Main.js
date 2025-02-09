///Lleva el manejo principal de toda la aplicacion
//Variables
const pathName          =           window.location.pathname;
let toggleClass         =           true;

//lista de ticket
const ticketOpen        =       [
    ['M0001', 'Problemas en la calle 32', '15/08/2024', '03:40pm', 'El pasado viernes hubo un accidente en la calle 32 donde un camión quedo averiado y termino destruyendo parte de la calle y time falta realizar un matenimiento'],
    ['M0032', 'Fallo en la bomba de agua', '12/10/2024', '09:12am', 'la bomba que distribuye agua a todo el sector 12 ha dejado de funcionar.']
];

const ticketClose       =       [
    ['M0102', 'Falta de iluminacion en la calle 87', '01/02/2023', '05:00pm', 'Se han dañado dos postes que iluminaban las calles del barrio dentro de la calle 87, esto debido a que ocurrio un accidente automovilistico y debido a ciertas maniobras terminaron estrellando el automovil en el poste, y este poste termino afectando a su poste compañero del otro lado de la acera'],
    ['M0F82', 'Vecinos ruidosos a las 2 de la mañana', '12/06/2024', '08:07am', 'Mis vecinos colocan musica a altas horas de la noche y a un volumen muy fuerte'],
    ['M0002', 'Problemas Tecnicos con la pagina', '05/08/2024', '11:11am', 'Ha existido un error en la pagina, cada vez que intento descargar los recursos y plantillas pdf, me da error 404']
];

const listTicket = [ticketOpen, ticketClose];

//Pagina inicial
function homeService () {

    const buttonLogin       =       document.getElementById('buttonLogin');

    if (buttonLogin != null) {
        buttonLogin.addEventListener('click', async () => {
    
            console.log('Boton Presionado :v');
            window.location.href        =   'Dashboard.html';
        });
    }
}


//Pagina de dashboard
function dashboardService () {
    
    //Cerrar sesion
    const logout        =   document.getElementById('logout');

    if (logout != null) {
        //Inputs de registro de tickets
        const inputData     =       document.querySelectorAll('[data-action="input-ticket"]');
    
    
        logout.addEventListener('click', function () {
            window.location.href    =  'index.html';
        });
    
    
        //Agregar tickets al dom
        const panelShowListTicket   =   document.querySelectorAll('.dashboard__list-ticket');
        showData(listTicket[0][0]);
    
        for (let i = 0; i < panelShowListTicket.length; i++) {
            const panel = panelShowListTicket[i];
    
            listTicket[i].forEach(index => {
                addTicket(panel, index);
            });
            
        }
    
        //Cerrar ventana de la tabla informativa
        document.getElementById('close-window-show-ticket').addEventListener('click', () => alterClass('dashboard__show-data', ['dashboard__show-data', 'dashboard__show-data--active']));
    
        //Registrar controlador de Eventos
        const windowTicketController      =       document.querySelectorAll('[data-action="window-ticket-controller"]');
    
        windowTicketController.forEach(controller => {
    
            //Administrar evento
            controller.addEventListener('click', () => {
                alterClass('dashboard__create-ticket', ['dashboard__create-ticket', 'dashboard__create-ticket--disable']);
    
                inputData[0].value = "";
                inputData[1].value = "";
            });
    
        });
    
        const registerTicket = document.getElementById('register-ticket');
    
        registerTicket.addEventListener('click', function () {
    
            if (inputData[0].value.length === 0 || inputData[1].value.length === 0) {
                alert('Debes Rellenar todos los campos');
    
            } else if (inputData[0].value.length > 50) {
                alert('El asunto debe contener menos de 50 caracteres');
    
            } else{
                //Obtener fecha y hora
                const time = new Date();
    
                // Obtener los valores de día, mes y año
                const dia = String(time.getDate()).padStart(2, '0');
                const mes = String(time.getMonth() + 1).padStart(2, '0'); // Meses inician en 0
                const anio = time.getFullYear();
            
                // Obtener la hora en formato de 12 horas
                let horas = time.getHours();
                const minutos = String(time.getMinutes()).padStart(2, '0');
                const ampm = horas >= 12 ? 'PM' : 'AM';
            
                // Convertir al formato de 12 horas
                horas = horas % 12 || 12; // La hora '0' se convierte en '12'
            
                // Formatear fecha y hora
                const fecha         =       `${dia}/${mes}/${anio}`;
                const hora          =       `${horas}:${minutos} ${ampm}`;
                const code          =       `${letraAleatoria()}0${numeroAleatorio(0, 9)}${numeroAleatorio(0, 9)}${numeroAleatorio(0, 9)}`
                const ticket        =       [code, inputData[0].value, fecha, hora, inputData[1].value];
    
                addTicket(panelShowListTicket[0], ticket);
                //registerEventShowTicket();
                alterClass('dashboard__create-ticket', ['dashboard__create-ticket', 'dashboard__create-ticket--disable']);
            }
        });

    }
}


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function letraAleatoria() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const indice = Math.floor(Math.random() * letras.length);
    return letras[indice];
}


function alterClass (element, changeClasses) {
    const containerMain     =       document.getElementById('container-main');
    const panelShowData     =       document.getElementById(element);

    const indexClass        =       (panelShowData.classList[0] === changeClasses[0]) ? 1 : 0;

    containerMain.classList.toggle('active');
    panelShowData.classList.replace(panelShowData.classList[0], changeClasses[indexClass]);

    toggleClass = !toggleClass;
}


function addTicket (panel, data) {

    const listItem = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    listItem.className = 'dashboard__item'; // Asignar clase
    span.textContent = `Ticket: ${data[0]}`; // Asignar texto

    //button.setAttribute('data-action', 'window-controller'); // Asignar atributo
    //button.setAttribute('data-event-controller', 'false'); // Asignar atributo
    button.className = 'button'; // Asignar clase
    button.textContent = 'Detalles';

    button.addEventListener('click', () => {
        showData(data);

        if (window.innerWidth <= 768) {
            //Cambiar de clases dependiendo solo cuando esten en dispotivos portatiles
            alterClass('dashboard__show-data', ['dashboard__show-data', 'dashboard__show-data--active']);
        }
    });

    listItem.appendChild(span);
    listItem.appendChild(button);

    panel.appendChild(listItem);
}

function showData (dataTicket) {
    const showDataList      =       document.querySelectorAll('[data-action="view-data-list"]');

    for (let i = 0; i < showDataList.length; i++) {
        showDataList[i].textContent = `${dataTicket[i]}`; // Asignar texto
    }
}


function crearCookie (nombre, valor, minutos) {

    let expiracion = "";
    if (minutos) {
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + (minutos * 60 * 1000)); // Convertir minutos a milisegundos
        expiracion = `; expires=${fecha.toUTCString()}`;
    }
    
    document.cookie = `${nombre}=${valor}${expiracion}; path=/`;
}


//Obtener una cookie
function obtenerCookie(nombre) {
    const nombreEQ = `${nombre}=`;
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nombreEQ) === 0) {
            return cookie.substring(nombreEQ.length, cookie.length); // Devuelve el valor de la cookie
        }
    }

    return null; // Si la cookie no se encuentra
}

//Borrar Cookie
function borrarCookie(nombre) {

    // Establecer la fecha de expiración en el pasado
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


//Ejecutar funcion al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('container-main');
    
    if (container.classList.length > 1) {
        container.classList.toggle('active');
    }

    homeService();
    dashboardService();

});

// Agregar el evento resize al objeto window
window.addEventListener('resize', () => {

    if (window.innerWidth > 768 && toggleClass === false) {
        alterClass('dashboard__show-data', ['dashboard__show-data', 'dashboard__show-data--active']);
    }
});