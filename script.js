let juego_actual = 0;

let sliders = ['slide-1', 'slide-2']
let audios_sond = ['Audio1', '', 'Audio2']

let presentacion_slide = 0
let audio;
let audioOvers;
let audiosBotonesOver;
let path_sound = './public/sounds/'
let contadorEjercicios = 0


/*
Actividad 
*/
let numerosActividad = [-12, -15, 16, 20, -7, -13, 5, -3, 9, -17]
let numerosExponente = [2, 4, 3, 4, 5, 3, 2, 5, 5, 2]
let numeroActual;
let numeroFraccionInicial;


let contenedorInputs = document.querySelectorAll('.contenedor-inputs > .row')
let numeroActividad = document.querySelector('.numeroActividad')


let temporal = []
for (let i = 0; i < numerosActividad.length; i++) {
	temporal = [...temporal, i]
}

//Organizamos de forma aleatoria un array.
temporal.sort(() => Math.random() - 0.5)

let posicionAleatorio = 0;

function init() {
	document.body.addEventListener('keyup', presentacionteclado, false)
	document.getElementById('siguiente').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguiente').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('atras').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atras').addEventListener('mouseout', btnSoundOut, false)
	/* document.getElementById('atrasFracciones').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atrasFracciones').addEventListener('mouseout', btnSoundOut, false) */
	document.getElementById('siguienteFraccion').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguienteFraccion').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('comprobar').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('comprobar').addEventListener('mouseout', btnSoundOut, false)
	cargarActividad()
	cargarAudio();
}



function btnSoundOver() {
	audioOvers = new Audio(`${path_sound}61.mp3`);
	audioOvers.play();
}

function btnSoundOut() {
	audioOvers.pause();
}

function presentacionteclado(e) {


	if (e.keyCode == 39) {

		siguiente()
	}

	if (e.keyCode == 37) {
		if (getCurrentSlider() == 0 || getCurrentSlider() == 2) {

		} else {
			atras()
		}

	}


	if (e.keyCode == 13 && presentacion_slide == sliders.length - 1) {
		comprobar()
	}


}

function cargarAudio(loop = false) {
	if (audios_sond[presentacion_slide] != null || audios_sond[presentacion_slide] != undefined) {
		audio = new Audio(`${path_sound}${audios_sond[presentacion_slide]}.mp3`);
		audio.loop = loop
		audio.mute = true;
	}

}

function changeSound(new_sond) {
	audio.src = `${path_sound}${new_sond}.mp3`;
	audio.pause();
	audio.load();
	audio.play();
	audio.addEventListener('ended', function () {

	});
}


function presentacion() {
	if (presentacion_slide == 0) {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "hidden"
		//document.getElementById('visubility').style.display = "inline-block"

	} else if (presentacion_slide == sliders.length - 1) {
		document.getElementById('siguiente').style.display = "none"
		//document.getElementById('atras').style.display = "none"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('siguiente').style.display = "none"
		//changeSound(audios_sond[presentacion_slide])
	} else {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('actividad').style.display = "none"

	}
	/* console.log(`slide-${presentacion_slide}`);*/
}


function siguiente() {
	if (presentacion_slide == sliders.length - 1) {
	} else {
		presentacion_slide++
		document.getElementById(sliders[presentacion_slide - 1]).style.display = "none"
		document.getElementById(sliders[presentacion_slide]).style.display = "block"
		audioOvers = new Audio(`${path_sound}60.mp3`);
		audioOvers.play();
		presentacion()
		limpiar()
	}
}

function atras() {
	presentacion_slide--
	document.getElementById(sliders[presentacion_slide + 1]).style.display = "none"
	document.getElementById(sliders[presentacion_slide]).style.display = "block"
	audioOvers = new Audio(`${path_sound}60.mp3`);
	audioOvers.play();
	presentacion()
	limpiar()
}

function getCurrentSlider() {
	return presentacion_slide
}


function cargarActividad() {
	numeroFraccionInicial = retornarAleatoria()
	numeroActual = new Array(numerosExponente[numeroFraccionInicial])

	numeroActual.fill(numerosActividad[numeroFraccionInicial])
	let inputDinamico = `<div class="input-actividad">
	<input type="text" class="input"  maxlength="6">
	<div class="recuadro"></div>
</div>`
	//let contenedorRespuestaDinamico = `<div class="recuadro"></div>`
	numeroActividad.innerHTML = `<span>${numerosActividad[numeroFraccionInicial]}<sup>${numerosExponente[numeroFraccionInicial]}</sup>=</span>`
	let signo = '<span class="signo">x</span>'
	for (let index = 0; index < numeroActual.length + 1; index++) {
		if (index > numeroActual.length - 1) {
			signo = '<span class="signo">=</span>'
		}
		index == 0 ? contenedorInputs[0].innerHTML += `${inputDinamico}` : contenedorInputs[0].innerHTML += `${signo} ${inputDinamico}`
		//index == 0 ? contenedorInputs[1].innerHTML += contenedorRespuestaDinamico : contenedorInputs[1].innerHTML += contenedorRespuestaDinamico
	}

}

function fraccionesAleatorias() {
	numeroActividad.innerHTML = ''
	contenedorInputs[0].innerHTML = ''
	contenedorInputs[1].innerHTML = ''
	if (posicionAleatorio != numerosActividad.length - 1) {
		posicionAleatorio++
		document.querySelector('#numeroEjercicio').innerHTML=posicionAleatorio+1
	} else {
		document.querySelector('#numeroEjercicio').innerHTML=1
		posicionAleatorio = 0
	}
	cargarActividad()
}

function comprobar() {
	let inputs = document.querySelectorAll('.input')
	let valores = []

	let cajascheck = document.querySelectorAll(
		`${".recuadro"}`);

	inputs.forEach((element) => {
		valores.push(element)
	})

	numeroActual.forEach((element, index) => {
		if (element == valores[index].value) {
			valores[index].style.border = "2px solid green"
			cajascheck[index].classList.remove('imagen-correcta-resultado')
			cajascheck[index].classList.remove('imagen-incorrecta-resultado')
			cajascheck[index].classList.add('imagen-correcta-resultado')
			cajascheck[index].style.visibility = 'visible'
			document.querySelector('.mensajeActividad').style.visibility = 'hidden'
		} else {
			valores[index].style.border = "2px solid red"
			cajascheck[index].classList.remove('imagen-correcta-resultado')
			cajascheck[index].classList.remove('imagen-incorrecta-resultado')
			cajascheck[index].classList.add('imagen-incorrecta-resultado')
			cajascheck[index].style.visibility = 'visible'
			document.querySelector('.mensajeActividad').style.visibility = 'visible'
		}
	})


	

	if (Number(valores[valores.length - 1].value) === resultadoNumeroExponencial()) {
		valores[valores.length - 1].style.border = "2px solid green"
		cajascheck[cajascheck.length - 1].classList.remove('imagen-correcta-resultado')
		cajascheck[cajascheck.length - 1].classList.remove('imagen-incorrecta-resultado')
		cajascheck[cajascheck.length - 1].classList.add('imagen-correcta-resultado')
		cajascheck[cajascheck.length - 1].style.visibility = 'visible'
	} else {
		valores[valores.length - 1].style.border = "2px solid red"
		cajascheck[cajascheck.length - 1].classList.remove('imagen-correcta-resultado')
		cajascheck[cajascheck.length - 1].classList.remove('imagen-incorrecta-resultado')
		cajascheck[cajascheck.length - 1].classList.add('imagen-incorrecta-resultado')
		cajascheck[cajascheck.length - 1].style.visibility = 'visible'
	}

}

function limpiar() {
	let inputs = document.querySelectorAll('.input')


	inputs.forEach((element) => {
		element.value = '';
		element.style.border = "1px solid silver"
	})

	let cajascheck = document.querySelectorAll(
		`${".recuadro"}`);

	cajascheck.forEach(element => {
		element.classList.remove('imagen-correcta-resultado')
		element.classList.remove('imagen-incorrecta-resultado')
	});

}



function retornarAleatoria() {
	return temporal[posicionAleatorio]
}

function resultadoNumeroExponencial() {
	return numerosActividad[numeroFraccionInicial] ** numerosExponente[numeroFraccionInicial]
}

function atrasFracciones() {
	contadorEjercicios = 0
	document.querySelector('#contadorEjercicios').innerHTML = ''
	document.querySelector("#atrasFracciones").style.visibility = 'hidden'
	document.querySelector("#atrasFracciones").style.display = 'none'
	document.querySelector("#limpiar").style.display = 'block'
	limpiar()
}