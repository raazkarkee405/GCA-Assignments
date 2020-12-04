calcCircumference = () => {
    let numbers = /^[0-9]+$/;
    var radius = parseFloat(document.getElementById('radius').value);
    let circum_html = '';
    if(numbers.test(radius)){
            circum_html = circum_html + 
                `<p>The Circumference is ${2 * (Math.floor(Math.PI * 100) / 100) * radius}</p>`
            document .getElementById("circum").innerHTML = circum_html; 
    }
    else {
        alert('Please input positive number only')
    }
}


