function decididoCheck(nameSelect)
{
    if(nameSelect){
        admOptionValue = document.getElementById("TahDecidido").value;
        if(admOptionValue == nameSelect.value){
            document.getElementById("decididoCheck").style.display = "block";
        }
        else{
            document.getElementById("decididoCheck").style.display = "none";
        }
    }
    else{
        document.getElementById("decididoCheck").style.display = "none";
    }
}