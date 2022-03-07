const divRespuesta = document.querySelector('#respuesta');
const respuesta = document.createElement('h2');

function validateKey(event){
    if(event.keyCode >= 65 && event.keyCode <= 90 ||event.keyCode >= 97 && event.keyCode <= 122 || event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 44)
        return true;
    else   
        return false;
}

function show(){
    let written = document.getElementById('vector').value;
    let vector = written.split(',');
    respuesta.innerHTML = vector.join(' - ');
    divRespuesta.append(respuesta);
}

function order(){
    let written = document.getElementById('vector').value;
    let vector = written.split(',');

    vector = vector.sort(compare);   

    respuesta.innerHTML = vector.join(' - ');
    divRespuesta.append(respuesta);
}

function reverse(){
    let written = document.getElementById('vector').value;
    let vector = written.split(',');

    vector = vector.sort(compare);    
    vector = vector.reverse();

    respuesta.innerHTML = vector.join(' - ');
    divRespuesta.append(respuesta);
}

function compare(a, b){  
    if (!isNaN(a) && !isNaN(b)) 
        return a-b;
    else {
        a = toLower(a);
        b = toLower(b);
        if (a < b)
            return -1;
        else if (a == b)
            return 0;
        else   
            return 1;
    }    
}

function toLower(value){
    if (typeof (value) == 'string')
        return value.toLowerCase();
    else
        return value;
}