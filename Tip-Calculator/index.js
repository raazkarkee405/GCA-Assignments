//Calculate Tip
calculateTip = () => {
    let billAmt = parseFloat(document.getElementById('billAmt').value);
    let tipPer = parseFloat(document.getElementById('tipPer').value);
    let total_html = '';

    if(billAmt === "" || tipPer == 0) {
        alert("Please enter values");
        return;
    }

    let totalTip = Math.round((billAmt * tipPer) * 100) / 100;
    let totalAmt = Math.round((billAmt + totalTip) * 100) / 100;

    total_html = total_html + `<p>Tip Amount = ${totalTip}<p> 
                    <p>Total Amount = ${totalAmt}</p> `

    document.getElementById("total").innerHTML = total_html;                
    
}

