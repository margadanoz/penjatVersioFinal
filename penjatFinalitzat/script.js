// panell de letres del joc:
let panelLetras = document.querySelector('.panelLetras');
// Agafar elements del DOM que respecten a la selecció de categoria del joc:
const categoriaJoc = document.querySelector('#categoriaJoc');
// Frase que mostra errors:
let textErrors = document.getElementById('mostraErrors');
let nombreErrors = document.getElementById('nombreErrors');
// Agafa per modificar el nombre de errors al html l'element del dom
let nombreIntents = document.getElementById('nombreIntents');
// Agafa per modificar el nombre de errors al html l'element del dom
let intents = document.getElementById('intents');
// Butó que apareix quan s'acaba una partida, be es guany be es perdi:
let tornarJugar = document.getElementById('tornarJugar');
// Mensajes para si gana o pierde:
let mensajeGanador = document.querySelector('.mensajeGanador');
let mensajePerdedor = document.querySelector('.mensajePerdedor');
// Element que pintarà els guions:
let guionesPalabra = document.querySelector('.guionesPalabra');
// Para mostrar la palbra por la cual se juagaba:
let palabraJuego = document.querySelector('.palabraJuego');
// Para coger directamente las letras, util para crono individual por letra:
let letra = document.querySelector('.panelLetras');
// Per mostrar el crono de la lletra:
let cronoLetra = document.querySelector('.cronoPorLetra');
// // Per frase de seleccioni una lletra
let textTempsPerLletra = document.querySelector('#textTempsPerLletra');
// Para locutar titulo del juego cuando se gana o se pierde:
let titolJoc = document.querySelector('#titolJoc');
// Poer l'interval de lletres aturarlo definitivament:
let juegoFinalizado = false;
// Variable per capturar el valor de lo que s'ha escollit al dom:
let categoriaEscollida;
// VARIABLES PARA JUEGO: PALABRAS, ERRORES, ETC
// Array de palabras para comprobar que funciona. Sustituir después:
let arrayPalabrasSecretas = [];
//Variable que almacene palabra secreta
let palabraSecreta;
// Per mantenir categoria:
let mantenirCategoria;

// TIEMPO:
// Cronómetre del joc FASE1:
let cronometro = document.querySelector('.cronometro');
// El crono tendrá un minuto cuando se haga click.
let tiempo = new Date();
// Para que marque tan solo un minuto según se clicka primera palabra:
tiempo.setHours(0,1,0,0);
// Crono de tiempo para toda la palabra:
cronometro.innerHTML = "00:01:00";
// para almacenar intervalo de tiempo de palabra:
let cronoAtras;
let segundos;
// Boolean que pasaremos de la funciíon de cuenta atrás de las letras para 
// que no se reinicie la cuenta atrás si se pica por segunda vez una letra fallada,
// o por sis e pica en el panel de Letras (el div que contiene las letras):
let esPanelLetras = false;
let falladaRepetida = false;
//Variable para contar los errores, se irá sumando si fallamos:
let errores = 0;
// Variables para contar numero de intentos, se decrementará:
// Solo se decrementa si se falla la letra:
let intentos = 7;
// Boolean para ver si se acierta o no la letra y en función de eso
// pintarla de rojo o de verde:
let letraAcertada = true;
// Contador para iniciar el cronómetro de la cuenta atrás:
let activaCronometro = 0;
//Variable para generar guiones
let guion = [];
//Guardamos el indice de la letra acertada:
let indiceLetraAcertada = 0;
// Para guardar las letras que se vayan fallando y que no las puedan picar más:
let arrayLetrasFalladas = [];
//Para guardar aquellas que vayamos acertando y comparar length de este array con length de palabraSecreta:
let arrayLetrasAcertadas = [];
// Variable per emmagatzemar el temps final de la paraula quan s'acabi del joc, per després emmagatzemar a LocalStorage:
let tiempoFinal;
// variable per controlar si es torna a pitjar una altra vegada una lletra encertada i no disparar el crono individual x lletra:
let letraAComprobar = "";
// CODI DE LA FASE 2:
// Cronometro especifico para letras:
let tiempoLetra = new Date();
tiempoLetra.setHours(0, 0, 30, 0);
cronoLetra.innerHTML = "00:00:30";
let segundosLetra;
let contadorVecesQueEntra = 0;
// Almacena setTimeOut:
let almacenaTiempoLetra;
// boolean per controlar repetides bones:
let repetidaBuena = false;

// Arrays de Categorias:
// Arrays del joc dividits per categoria, contenen ja tres nivells de dificultat, hi han paraules curtes i llargues:
// Animals mamífers:
const mamiferos = ['lobo', 'panda', 'nutria', 'marjor', 'quokka','ardilla', 'gorila', 'perezoso', 'antilope', 'ornitorrinco',
'armadillo', 'puercoespin', 'dromedario', 'jineta', 'pichiciego'];

// Ocells:
const ocells = ['aguila', 'loro', 'canario', 'paloma', 'jilguero','cuervo', 'abubilla', 'cogujada', 'urraca', 'periquito',
                        'petirrojo', 'agaporni', 'cotorra', 'buho', 'estornino'];
// Animals mitològics:
const mitologicos = ['grifo', 'centauro', 'hidra', 'banshee', 'quimera', 'basilisco', 'minotauro', 'unicornio', 'hipogrifo', 'fenix',
                                'esfinge', 'kraken', 'circe', 'harpia','dragon'];
// Pokemons:
const pokemon = ['arceus', 'meowth', 'raichu', 'ivysaur', 'eevee','pikachu', 'charizard', 'bulbasaur', 'jigglypuff', 'vulpix',
                            'snorlax', 'machop', 'psyduck', 'gengar', 'lapras', 'onix', 'growlithe', 'magikarp'];


// Event per capturar els valors cada vegada que es canvien les categorias
categoriaJoc.addEventListener('change', (e)=>{
    // El target es el select, hay que ponerle el + para pasarlo a number
    categoriaEscollida = e.target.value;

    actualitzaValorsSeleccionats(categoriaEscollida);
});

function actualitzaValorsSeleccionats(categoriaEscollida){
    // Agafem els valors seleccionats amb els option i els actualitzem:
    // Guardar la categoría en el localStorage para cuando recargio la página que no me desaparezca:
    localStorage.setItem('categoriaSeleccionada', categoriaEscollida);
    

    if(categoriaEscollida === 'categoriaMamiferos'){

        // Buidem els guions per evitar que es dupliquin quan es canvia de categoria:
        guion = [];

        arrayPalabrasSecretas =  mamiferos;
        //Primero generar palabra secreta:
        palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
        generarGuiones(palabraSecreta);
        console.log(arrayPalabrasSecretas);
        console.log(palabraSecreta);
        mantenirCategoria = 'categoriaMamiferos';

    }else if(categoriaEscollida === 'categoriaOcells'){

                // Buidem els guions per evitar que es dupliquin quan es canvia de categoria:

        guion = [];

        arrayPalabrasSecretas = ocells;
        //Primero generar palabra secreta:
        palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
        generarGuiones(palabraSecreta);
        console.log(arrayPalabrasSecretas);
        console.log(palabraSecreta);
       
    }else if(categoriaEscollida === 'categoriaMitologics'){

               // Buidem els guions per evitar que es dupliquin quan es canvia de categoria:

        guion = [];

        arrayPalabrasSecretas = mitologicos;
        //Primero generar palabra secreta:
        palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
        generarGuiones(palabraSecreta);
        console.log(arrayPalabrasSecretas);

    }else if(categoriaEscollida === 'categoriaPokemon'){

                // Buidem els guions per evitar que es dupliquin quan es canvia de categoria:

        guion = [];

        arrayPalabrasSecretas = pokemon;
        //Primero generar palabra secreta:
        palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
        generarGuiones(palabraSecreta);
        console.log(arrayPalabrasSecretas);
        console.log(palabraSecreta);
    }
}

// Función que arranca nada más entrar al juego y genera los guiones,
// tomando como argumento la longitud de la palabra:
function generarGuiones(palabraSecreta){

    for(let i = 0; i < palabraSecreta.length; i++){

        //Generamos el mismo numero que el length de palabraSecreta,
        // necesario dentro del bucle, pintar num definitivo necesario fuera de bucle
        guion.push("_ ");

    }
    console.log(guion);

     //Pintamos los guiones por el html:
     guionesPalabra.innerHTML = guion.join("");
}

// Cuando se haga click sobre la letra se comprueba si es o no es correcta:
panelLetras.addEventListener('click',comprobarLetra);

function comprobarLetra(e) {

    //capturar valor de la lletra cuando se haga click sobre ella:
    let letraSeleccionada = e.target.innerHTML;

    console.log(letraSeleccionada);

    // Como de nuestro array nos vienen en minúsculas las letras pasamos la palabra
    // escogida a upperCase:
    palabraSecreta = palabraSecreta.toUpperCase();

    console.log("impriendo antes del if",letraAComprobar);
    console.log("lletra seleccionada",letraSeleccionada);
    console.log("lletra a comprovar",letraAComprobar);

    // Para evitar que si picamos fuera de las letras, en lo que es el panel nos de fallo
    // sino contabilizaba el fallo y se ponia el panel entero en rojo:
    // Mirem si cliquen de nou la mateixa lletra, si es així no reiniciarà el crono ni es sumarà com a bona
    // en cas que piquin de nou la bona:
    if(e.target.classList.value !== 'panelLetras' && !arrayLetrasAcertadas.includes(letraSeleccionada)){


        console.log("impriendo despues del if",letraAComprobar);
        console.log(letraAComprobar);

        esPanelLetras = false;

        for (let i = 0; i < palabraSecreta.length; i++) {
            // Resetejem valors dels booleans que controlen les repetides per no tenir falls:
            repetidaBuena = false;
            falladaRepetida = false; 
        
            if(palabraSecreta.charAt(i) === letraSeleccionada) {
                activaCronometro++;
    
                // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
                if(activaCronometro === 1){
                    // Llama la función del intervalo, que a su vez
                    // llama a la función que genera la cuenta atrás:
                    activaCuentaAtras();
                }
    
                console.log(palabraSecreta);
    
                // Guardamso el indice para poder guiarnos con el para insertar las letras acertadas
                // y pintar los guiones de nuevo donde no se ha acertado:
                indiceLetraAcertada = i;
    
                // Establecemos clase letra correcta si la letra coincide, sin este fragmento me daba error:
                e.target.classList.value = "letra correcta";
    
                // Añadimos la clase 'correcta' al elemento clickado
                e.target.classList.add('correcta');
    
                // Sustituimos los guiones por las letras acertadas:
                // Alli donde este el indice  de la letra acertada insertaremos dicha letra:
                guion[indiceLetraAcertada] = letraSeleccionada;
                
                arrayLetrasAcertadas.push(letraSeleccionada);
                // Després d'emmagatzemar la lletra encertada l'equiparem a la variable de control
                // per mirar si la clickan de nou, si es així ni reiniciarà el crono individual
                // ni entrarà per aquest bloc, per evitar fallos
                letraAComprobar = letraSeleccionada;
    
                // Actualizamos el texto del html
                guionesPalabra.innerHTML = guion.join(" ");
    
            // si entramos pror el else if es que se ha fallado la letra y le damos su clase para manejo visual y del código:
            }else if(palabraSecreta.charAt(i) !== letraSeleccionada && e.target.classList.value !== "letra correcta"){
    
                e.target.classList.add('incorrecta');
               
            }
        }
        // Si la lletra actualment seleccionada no és correcta restarem intents i sumarem fallos:
            if(e.target.classList.value !== "letra correcta"){

                falladaRepetida = false;

                // Mirem si la lletra fallada está a l'array de fallades, si no es així la incloem
                // Això evita que en continuar picant a la lletra fallada es vagin sumant errors:
                    if(!arrayLetrasFalladas.includes(letraSeleccionada)){
                        
                         // fiquem la lletra fallada a l'array de lletres fallades perque no puguin continuar
                        // sumant errors si la tornen a picar:
                        arrayLetrasFalladas.push(letraSeleccionada);
                       
                    }else{

                        falladaRepetida = true;                      
                    }              

                activaCronometro++;
    
                // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
                if(activaCronometro === 1){
                    // Llama la función del intervalo, que a su vez
                    // llama a la función que genera la cuenta atrás:
                    activaCuentaAtras();
                }
                    //actualizamos variables solo si no se ha llegado al num max de errores y num minim para intentos (0)
                    // y solo si no se esta picando en una letra ya fallada:
                    if(intentos !== 0 && errores !== 7 && !falladaRepetida){
    
                        intentos --;
                        errores ++;
                    }
    
                    //actualizamos valores de los elementos del html:
                    nombreErrors.innerHTML = errores;
                    nombreIntents.innerHTML = intentos;           
            }
       
            // A cada vuelta de bucle comprobaremos si hemos ganado o perdido:
            comprobarGanarPerder(); 

    }else{
        // Si se pica en el panel de letras, es decir fuera de lo que son los botones de las letras
        // no se restan intentos ni se suman fallos,ni tampoco se vuelve a activar la cuenta atras de las letras:
        intentos = intentos;
        errores = errores;
        esPanelLetras = true;
        repetidaBuena = true;
        console.log(repetidaBuena);
        console.log("Bona repetida");
    }     
}

function cuentaAtrasPalabra(){

    let minutos= tiempo.getMinutes();
    segundos = tiempo.getSeconds();
    // Si los segundos son superiores a cero iremos reduciendo:
    if(segundos > 0){      
        segundos -= 1;

        if(segundos === 1){

            segundos -1;

            if(segundos === 0){
              
                // Cuando llegamos a cero se llama a la función que dispara
                // el gameover
                comprobarGanarPerder();
            }

        }
    }

    if(minutos > 0 && segundos === 0){
        minutos -= 1;
        segundos = 59;
    }
    
    tiempo.setMinutes(minutos);
    tiempo.setSeconds(segundos);

    /**Para impresion del crono, solo visual */
    if(minutos < 10){

        minutos = "0" + minutos;      
    }
    if(segundos < 10){

        segundos = "0" + segundos;      
    }
    cronometro.innerHTML = "00" + ":" + minutos + ":" + segundos;   
    // Emmagatzemem a variable el temps final que tindrem quan pari el joc:
    tiempoFinal = tiempo.getSeconds();
    console.log(tiempoFinal);
    // console.log("desde funcion que controla el crono",tiempoFinal);
}

// Contiene intervalo, activado al primer click
function activaCuentaAtras(){

        cronoAtras = setInterval(cuentaAtrasPalabra, 1000);
}

// Debe comprobar parámetros para ver si el jugador ha ganado o ha perdido:
function comprobarGanarPerder(){

    // Condiciones que deben darse para que se pare la cuenta atrás
    if(errores === 7 || tiempoFinal === 0 || arrayLetrasAcertadas.length === palabraSecreta.length){

        console.log("Entra en la parte que interesa");
        clearInterval(cronoAtras);
        // Limpiamos el timeOut que controla la cuenta atras d ela letra:
        clearTimeout(almacenaTiempoLetra);

        cronoLetra.style.display = 'none';
        seleccioLletra.style.display = 'none';
        textTempsPerLletra.style.display = 'none';
        titolJoc.style.display = 'none';

       
        // Si entramos por aqui ya imprimimos mensajes de ganar o perder
        // Ponemos boton para volver a jugar, ocultamos panel de letras:
        if(errores === 7 || tiempoFinal === 0){
            

            mensajePerdedor.style.display = 'inline';
            // Para mostrar la palabra por la cual se jugaba:
            palabraJuego.innerHTML = "Paraula per la qual es jugaba: " + palabraSecreta;
            palabraJuego.style.display = 'inline';
            panelLetras.style.display = 'none';
            guionesPalabra.style.display = 'none';
            tornarJugar.style.display = 'block';
            guionesPalabra.style.display = 'none';
            subtitol.style.display = 'none';
            nombreIntents.style.display = 'none';
            intents.style.display = 'none';
      

        }else if(arrayLetrasAcertadas.length === palabraSecreta.length){
            clearInterval(cronoAtras);

            // setTimeOut para dejar ver un momento el panel con la letra ganada, luego dispara todo lo demás
            setTimeout(function(){

                // Llamamos a la función de guardar los datos en el localStorage:
                // almacenarDatosLocalStorage();
                leerDatosYActualizar();

                mensajeGanador.style.display = 'block';
                // Para mostrar la palabra por la cual se jugaba
                palabraJuego.innerHTML = "Palabra por la cual se jugaba: " + palabraSecreta;
                palabraJuego.style.display = 'inline';
                panelLetras.style.display = 'none';
                guionesPalabra.style.display = 'none';
                tornarJugar.style.display = 'block';
                guionesPalabra.style.display = 'none';
                subtitol.style.display = 'none';
                nombreIntents.style.display = 'none';
                intents.style.display = 'none';
            },700);
        }
    }
}

// Evento para volver a jugar:
tornarJugar.addEventListener('click', reiniciarPanel);

function reiniciarPanel(){
    // Reciniamos toda la parte visual:
    location.reload(); 
}

// Evento para la cuenta atrás de las letras:
    letra.addEventListener('click', (e) => {

        // Per evitar que es reinicii quan piquem a sobre de la clase panelLetra
        if (e.target.classList.contains('letra')) {
        // Comprueba si estan picando dos veces la misma letra repetida incorrecta
        if(falladaRepetida !== true && repetidaBuena !== true){
    
            tiempoLetra.setSeconds(31);
    
        // Comprobar si la letra ya está almacenada en los arrays de letras falladas o de letras acertadas
        // con lo cual no entraría aquí y seguiría corriendo el tiempo
        if (tiempoLetra.getSeconds() === 31) {     
            
            
            clearTimeout(almacenaTiempoLetra);
            // Siempre que los segundos estén a 30 se iniciará el intervalo:
            cuentaAtrasLetra();
        }
        } 
    }  
    });
    


function cuentaAtrasLetra() {
        // Cridem la funció per comprovar si guanyem o perdem perque es podria donar el cas de tenir 6 fallos i esgotar temps del ultim:
        comprobarGanarPerder();

        actualizarCronometro();
    
        if(tiempoLetra.getSeconds() === 0){
            
            intentos--;
            errores++;
            // actualizamos valores de los elementos del html:
            nombreErrors.innerHTML = errores;
            nombreIntents.innerHTML = intentos;
            // Reiniciamos el tiempo para volver a iniciar el setTimeOut en caso de que no piquen ninguna letra:
            tiempoLetra.setSeconds(31);
        }

        if (tiempoLetra.getSeconds() > 0){
            // Llamada recursiva a la funcion que a su vez llamará a actualizar cronómetro
            // ambas se comunican el tiempo para que se pueda disparar el condicional de cuentaAtras en caso de llegar a 0
            // el crono y posteriormente reiniciarlo en caso de que no se pique
            almacenaTiempoLetra = setTimeout(cuentaAtrasLetra, 1000);
        }
}

// Función para actualizar el cronómetro en la interfaz
function actualizarCronometro() {

    // Controlará cuando limpiar el intervalo y volver a llamar a cuentaaTRASLetra
    contadorVecesQueEntra = 0;
    // Obtener los segundos actuales
    let segundosLetra = tiempoLetra.getSeconds();

    // Si los segundos son superiores a cero iremos reduciendo:
    if (segundosLetra > 0) {
        contadorVecesQueEntra++;
        segundosLetra = segundosLetra - 1;
        tiempoLetra.setSeconds(segundosLetra);
    }

    if (contadorVecesQueEntra === 30) {
        clearTimeout(almacenaTiempoLetra);
        // Siempre que los segundos estén a 30 se iniciará el intervalo:
        cuentaAtrasLetra();
    }

    if (segundosLetra < 10) {
        segundosLetra = "0" + segundosLetra;
    }
    // Va actualizando en el html el crono:
    cronoLetra.innerHTML = "00:" + "00" + ":" + segundosLetra;
}

// Funció pel localStorage, mira si hi han  dades, sino les crea, compara el valors i si son millors els actualitza
function leerDatosYActualizar(){

    let tempsMillorat = false;
    let intentsMillorats = false;

    // Leemos los datos del localStorage:
    let arrayPartidaLeer = JSON.parse(localStorage.getItem(palabraSecreta));

    // Comprovem si existeix, sino el creem:
    if(arrayPartidaLeer){

        console.log(arrayPartidaLeer);

                // Comprovació de dades per actualitzar o no temps e intents:
                if(tiempoFinal > arrayPartidaLeer.tempsRecord){
                    // Si el valor de tiempoFinal a la partida millora el del localStorage sustituim aquest valor pel nou:
                    arrayPartidaLeer.tempsRecord = tiempoFinal;
                    tempsMillorat = true;
                }
                if(intentos > arrayPartidaLeer.intentsRestants){
                    // Si es milloren els intents s'actualitza el valor de l'objecte:
                    arrayPartidaLeer.intentsRestants = intentos;
                    intentsMillorats = true;
                }

                // Comprovem si s'han millorat els intents i si es així insertem el nou objecte, sustituint el vell, sino no:
                if(tempsMillorat || intentsMillorats){
                    console.log("S'ha d'actualitzar l'objecte.");
                    // Transformem l'objecte en un array per poder ficarlo al localStorage:
                    let arrayPartida = JSON.stringify(arrayPartidaLeer);
                    console.log("Actualizado", arrayPartidaLeer);
                    localStorage.setItem(palabraSecreta,arrayPartida);
                }

        }else{

            // Creem un objecte per guardar al localStorage, ambs les dades finals:
        let partida = {
            "tempsRecord": tiempoFinal,
            "intentsRestants": intentos
        }

        // Transformem l'objecte en un array per poder ficarlo al localStorage:
        let arrayPartida = JSON.stringify(partida);

        localStorage.setItem(palabraSecreta,arrayPartida);
}
}

// Recuperem la categoria amb la qual es jugaba quan es carrega la pàgina, sino com tinc
// un reload a dalt m'he la reseteaba i l'havia de tornar a escollir:
document.addEventListener('DOMContentLoaded', () => {

    mantenirCategoria = localStorage.getItem('categoriaSeleccionada');

    if (mantenirCategoria) {
        //Si tenim una categoria ja seleccionada la carrega:
        actualitzaValorsSeleccionats(mantenirCategoria);
    }
});


