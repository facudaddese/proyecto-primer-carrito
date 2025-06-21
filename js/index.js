const btnAgregar = document.querySelectorAll(".btn-agregar");
const btnEliminar = document.querySelectorAll(".btn-eliminar");
const tabla = document.getElementById("tabla");

let arrayProductos = [];

function agregar() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500
    });
}
function eliminar() {
    Swal.fire({
        title: "Estás seguro que quieres borrar al producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar producto"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Borrado!",
                text: "Producto borrado con éxito.",
                icon: "success"
            });
        }
    });
}

btnAgregar.forEach(btn => {
    btn.addEventListener("click", () => {
        agregar();
        tabla.classList.add("visible");
        arrayProductos.push(btn);
        // const tr = document.createElement("tr");
        // const td = document.createElement("td");
        // const texto = document.createTextNode(arrayProductos.length);
        // td.appendChild(texto);
        // tr.appendChild(td);
        // tabla.appendChild(tr);
    })
});

btnEliminar.forEach(btn => {
    btn.addEventListener("click", eliminar);
});


