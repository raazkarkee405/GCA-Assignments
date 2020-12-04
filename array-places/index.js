let array =  ["Biratnagar", "Lalitpur", "Patan", "Kathmandu","Pokhara","Palpa"]

arrFun = (array) => {
    array.push("Bhaktapur", "Dolkha")
    console.log(array)
    const index = array.indexOf("Kathmandu")
    console.log(index)
    array.splice(index, 1)
    console.log(array)
    console.log("Length of Array is" + " " + array.length)
}

arrFun(array);


