class NewUserJS{

   mostrarFormulario1() {
    document.getElementById("form1").style.display = "block";
    document.getElementById("form2").style.display = "none";
  }
  
   mostrarFormulario2() {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "block";
  }
  mostrarTitulo(){
    console.log("Hola si funciona")
  }
}
export default NewUserJS;