document.getElementById('email').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('isCorrect');   
    emailRegex = /^[A-z0-9]{1,64}@([A-z0-9]+.){1,5}[a-z]{2,3}$/;

    
    if (emailRegex.test(campo.value)) {
      valido.innerText = "Válido";
    } else {
      valido.innerText = "Incorrecto";
    }
});