const btnEliminar = document.querySelectorAll(".btn-eliminar");
const btnAgregar = document.querySelectorAll(".btn-agregar");
const tabla = document.getElementById("tabla");

let array = [];

function agregar() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500
    });
}

function actualizar() {
    tabla.innerHTML =
        `<tr>
            <th>Cantidad de artículos seleccionados</th>
            <th>Producto</th>
            <th>Precio $</th>
            <th>Total $</th>
        </tr>`;

    array.forEach(prod => {
        const tr = document.createElement("tr");
        tr.innerHTML =
            `<td>${prod.cantidad}</td>
            <td>${prod.nombre}</td>
            <td>$${prod.precio.toLocaleString()}</td>
            <td>$${(prod.precio * prod.cantidad).toLocaleString()}</td>`;
        tabla.appendChild(tr);
    });
}

btnAgregar.forEach(btn => {
    btn.addEventListener("click", () => {
        tabla.classList.add("visible");

        const card = btn.closest(".card");
        const nombre = card.querySelector("h3").innerText;
        const precioTexto = card.querySelector("h4").innerText;
        const precio = Number(precioTexto.replace("$", "").replace(/\./g, ""));

        let productoExistente = array.find(p => p.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            array.push({
                nombre,
                cantidad: 1,
                precio
            });
        }

        actualizar();
        agregar();
    })
});

function eliminar(event) {
    const btn = event.currentTarget;
    const card = btn.closest(".card");
    const nombre = card.querySelector("h3").innerText;

    if (array.length > 0) {
        Swal.fire({
            title: "Estás seguro que quieres borrar al producto del carrito?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar producto"
        }).then((result) => {
            if (result.isConfirmed) {

                let productoEliminado = array.find(p => p.nombre === nombre);

                if (!productoEliminado) return;

                if (productoEliminado.cantidad > 1) {
                    productoEliminado.cantidad--;
                } else {
                    let index = array.findIndex(p => p.nombre === nombre);
                    if (index !== -1) {
                        array.splice(index, 1);
                    }
                }

                actualizar();

                Swal.fire({
                    title: "Borrado!",
                    text: "Producto borrado con éxito.",
                    icon: "success"
                });
            }
        });
    } else {
        Swal.fire({
            title: "No hay productos para borrar",
            text: "Agregalos al carrito.",
            icon: "warning"
        });

    }
}
btnEliminar.forEach(btn => {
    btn.addEventListener("click", eliminar);
});


