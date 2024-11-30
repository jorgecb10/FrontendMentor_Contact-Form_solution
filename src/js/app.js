document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[type="radio"]')
    const divRadios = document.getElementById('div-radios')
    const inputFirstName = document.getElementById('firstName')
    const inputLastName = document.getElementById('lastName')
    const inputEmail = document.getElementById('correo')
    const inputMessage = document.getElementById('message')
    const inputConsent = document.getElementById('consent')
    const formulario = document.getElementById('formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    const email = {
        firstName : '',
        lastName : '',
        correo: '',
        type: '',
        message: '',
        consent: false
    }

    inputFirstName.addEventListener('input', validar)
    inputLastName.addEventListener('input', validar)
    inputEmail.addEventListener('input', validar)
    inputMessage.addEventListener('input', validar)

    inputConsent.addEventListener('change', validarC)
    
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            actualizarRadio(this)
        })
    })

    formulario.addEventListener('submit', e => {
        e.preventDefault()

        limpiarAlertas()

        const esFormularioValido = validarFormulario()

        if(esFormularioValido) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.classList.remove('hover:bg-green-dark')
            btnSubmit.disabled = true

            const body = document.querySelector('body')
            const contenedorAbuelo = formulario.parentElement
            const success = document.createElement('div')

            success.innerHTML = `
                <div class="bg-grey-darker p-5 rounded-md">
                    <div class="flex gap-3 items-center">
                        <img src="src/assets/images/icon-success-check.svg" alt="icono-success"/>
                        <h1 class="text-base text-white"> 
                            Message Sent!
                        </h1>
                    </div>

                    <p class="text-sm text-white mt-3">
                        Thanks for completing the form. We'll be in touch soon!
                    </p>
                </div>
            `

            body.insertBefore(success, contenedorAbuelo)
            console.log(email);

            setTimeout(() => {
                body.removeChild(success)
                resetFormulario()
                btnSubmit.classList.remove('opacity-50')
                btnSubmit.classList.add('hover:bg-green-dark')
                btnSubmit.disabled = false
            }, 3000);
        } else {
            console.log('error');
        }
    })

    function validarFormulario() {
        let isValid = true

        const inputsText = [inputFirstName, inputLastName, inputEmail, inputMessage]

        inputsText.forEach(input => {
            if (!validar({ target: input })) {
                isValid = false;
            }
        })

        if(!validarRadios()) {
            mostrarAlerta(divRadios, 'Please select a query type')
            isValid = false
        }

        if(!validarC({ target: inputConsent })) {
            mostrarAlerta(inputConsent.parentElement, 'To submit this form, please consent to being contacted')
            isValid = false
        }

        return isValid
    }

    function validarRadios() {
        return [...radios].some(radio => radio.checked)
    }

    function actualizarRadio(radio) {
        const contenedor = radio.closest('.btn-radio')

        // Remover clases activas de todos los contenedores
        document.querySelectorAll('.btn-radio').forEach(div => {
            div.classList.remove('border-green-medium', 'bg-green-lighter')
            div.classList.add('border-grey-medium')
        })

        // Agregar clases activas al contenedor seleccionado
        if (radio.checked) {
            contenedor.classList.remove('border-grey-medium');
            contenedor.classList.add('border-green-medium', 'bg-green-lighter');
            email.type = radio.value;

            limpiarAlerta(divRadios)
        }
    }

    function validarC(e) {
        const checkbox = e.target
        if(checkbox.checked) {
            email.consent = true
            limpiarAlerta(checkbox.parentElement)
            return true
        } else {
            email.consent = false
            return false
        }
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(e.target.parentElement, 'This field is required')
            e.target.classList.remove('border-grey-medium')
            e.target.classList.add('border-red-hsl')
            email[e.target.name] = ''
            return false
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(e.target.parentElement, 'Please enter a valid email address')
            e.target.classList.remove('border-grey-medium')
            e.target.classList.add('border-red-hsl')
            email[e.target.name] = ''
            return false
        }

        limpiarAlerta(e.target.parentElement)
        e.target.classList.add('border-grey-medium')
        e.target.classList.remove('border-red-hsl')
        email[e.target.name] = e.target.value.trim().toLowerCase()
        return true
    }

    function mostrarAlerta(referencia, mensaje) {
        limpiarAlerta(referencia)

        const alerta = document.createElement('p')
        alerta.textContent = mensaje
        alerta.classList.add('alerta', 'text-red-hsl')
        referencia.appendChild(alerta)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta')

        if(alerta) {
            referencia.removeChild(alerta)
        }
    }

    function limpiarAlertas() {
        document.querySelectorAll('.alerta').forEach(alerta => alerta.remove());
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function resetFormulario() {
        email.firstName = ''
        email.lastName = ''
        email.correo = ''
        email.type = ''
        email.message = ''
        email.consent = false

        document.querySelectorAll('.btn-radio').forEach(div => {
            div.classList.remove('border-green-medium', 'bg-green-lighter')
            div.classList.add('border-grey-medium')
        })

        formulario.reset()
        limpiarAlerta(inputFirstName.parentElement)
        limpiarAlerta(inputLastName.parentElement)
        limpiarAlerta(inputEmail.parentElement)
        limpiarAlerta(divRadios)
        limpiarAlerta(inputMessage.parentElement)
        limpiarAlerta(inputConsent.parentElement)
    }
})