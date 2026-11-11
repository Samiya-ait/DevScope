export function validation(input){
    const validRegex=/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    const error=document.querySelector("#error")

    let inputValue=input.value.trim()
    if (!(validRegex.test(inputValue))){
        error.textContent = "1 à 39 caractères : lettres, chiffres et tirets uniquement (sans tiret au début ni à la fin).";
        error.classList.add("text-red-600")
        return;
    }else{
        return inputValue;
    }
}
