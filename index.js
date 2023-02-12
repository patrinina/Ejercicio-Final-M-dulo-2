

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const INPUT_TYPES = {
	NAME: 'nombre',
	CORREO: 'correo',
	PASSWORD: 'password',
	PASSWORD2: 'password2' 
}

// const validations = {
// 	required: '',
// 	alpha: '',
// 	email: '',
// 	minLength: '',
// 	samePassword: ''
// }

const FORM_INFO = {
	nombre: {
		expresion: /^[A-Za-z]+$/,
		error: 'Sólo puede contener letras.'
	},
	correo: {
		expresion:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		error: 'Email inválido'
	},
	password: {
		expresion:  /^.{8,}$/,
		error: 'No debe tener más de 8 caracteres.'
	},
	password2: {
		error: 'Las contraseñas no coinciden.'
	}
}


const handleInput = (e) => {
	switch (e.target.name) {
		case INPUT_TYPES.NAME:
			validarCampo(FORM_INFO[INPUT_TYPES.NAME].expresion, e.target, INPUT_TYPES.NAME);
		break;
		case INPUT_TYPES.CORREO:
			validarCampo(FORM_INFO[INPUT_TYPES.CORREO].expresion, e.target, INPUT_TYPES.CORREO);
		break;
		case INPUT_TYPES.PASSWORD:
			validarCampo(FORM_INFO[INPUT_TYPES.PASSWORD].expresion, e.target, INPUT_TYPES.PASSWORD);
		break;
		case INPUT_TYPES.PASSWORD2:
			validarPassword2();
		break;
	}
}

const showErrorField = (campo) => {
	document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
	document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
	document.querySelector(`#grupo__${campo} .formulario__image`).src = './images/error-icon.svg';
	document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
	document.querySelector(`#grupo__${campo} .formulario__input-error`).innerHTML = FORM_INFO[campo].error;
	document.querySelector(`#grupo__${campo} .formulario__input-error`).style.display = 'block';
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} .formulario__image`).src = './images/success-icon.svg';
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');		
		document.querySelector(`#grupo__${campo} .formulario__input-error`).style.display = 'none';
	} else {
		showErrorField(campo)
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		showErrorField('password2')
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 .formulario__image`).src = './images/success-icon.svg';
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		document.querySelector(`#grupo__password2 .formulario__input-error`).style.display = 'none';
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', handleInput);
	input.addEventListener('blur', handleInput);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const formGroup = document.querySelectorAll('.formulario__grupo');
	formGroup.forEach((field) => {
		const formInput = document.querySelector('.formulario__input')
		const errorField = document.querySelector(`#${field.id} .formulario__input-error`);
		if (!formInput.value) {
			errorField.innerHTML = 'Rellene este campo';
			errorField.style.display = 'block';
			document.querySelector(`#${field.id} .formulario__image`).src = './images/error-icon.svg';
			document.querySelector(`#${field.id}`).classList.add('formulario__grupo-incorrecto');
		} else {
			errorField.style.display = 'none';
			document.querySelector(`#${field.id}`).classList.remove('formulario__grupo-incorrecto');
			alert("El formulario se ha enviado correctamente")
		}
	})
});
