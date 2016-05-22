function checar(nameSelect, flag, if_selected)
{
    if(nameSelect){
        var opcao = document.getElementById(flag).value;
        if(opcao == nameSelect.value){
            document.getElementById(if_selected).style.display = "block";
        }
        else{
            document.getElementById(if_selected).style.display = "none";
        }
    }
    else{
        document.getElementById(if_selected).style.display = "none";
    }
}