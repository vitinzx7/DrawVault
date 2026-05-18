        // Base API URL used by the frontend to communicate with the backend.
        const apiUrl = "http://localhost:5136/api/desenhos";
        
        let imagens = "";

        // GET request: runs when the page loads and brings all drawings from the database.
        fetch(apiUrl)
        .then(response=> {
            return response.json();
        })
        
        .then((data) => {
            
            var galeria = document.querySelector(".grid");
            
            
            for (var desenho of data) {
                const imageUrl = `http://localhost:5136/imagens/${desenho.image_path.split('/').pop()}`;
                            
                 galeria.innerHTML += `
            <div class="card">
             
                <img src=${imageUrl}>
                <h3>${desenho.name}</h3>
                <p>${desenho.description}</p>
                <h3>${desenho.date}</h3>

                <!-- Delete button: calls the delete function using this drawing id. -->
                <button onclick="deleteimg(${desenho.id})">EXCLUIR</button>
                
         

            </div>

        `;
            }  
            imagens.addEventListener("click", () => {
                openLightbox(imageUrl);
            } )
                // Saves all rendered cards so the search filter can use them later
                imagens = document.querySelectorAll(".card");
        })
        .catch((error) => {
            console.error("Erro ao buscar dados", error)
        });

        // Button event: when clicked, it sends the form data to the backend using POST.

        const send = document.querySelector("#button")
        send.addEventListener("click", async () =>{
            // Get the values typed by the user in the form inputs.
            var name = document.getElementById("name").value;
            var date = document.getElementById("date").value;
            var description = document.getElementById("description").value;
            

            // FormData stores the text fields and the image file before sending them.
            const formData = new FormData();
            formData.append("name", name);
            formData.append("date", date)
            formData.append("description", description);


            // Get the selected image file from the file input and add it to FormData.
            const imputImagens = document.querySelector("#imagens")
            formData.append("formFile", imputImagens.files[0]);
            
            const response = await fetch("http://localhost:5136/api/desenhos", {
                method: "POST",
                body:formData,
            });
            console.log(await response.json());
        });

        // DELETE request: asks for confirmation and removes the selected drawing by id.
        function deleteimg(id) {
            if (confirm("Tem certeza que quer excluir?")) {
                fetch(`http://localhost:5136/api/desenhos/${id}`, {
             method: 'DELETE',
        })
        .then(res => {if(res.ok) console.log("deletado")})
}
        }

        // Search input used to filter the drawing cards by their title.
        let  searchBox = document.querySelector('#search-box');
    
        

        searchBox.oninput = () => {
            // Hide all cards first, then show only the ones that match the search text.
            imagens.forEach(hide => hide.style.display = 'none');
            let value = searchBox.value;

            imagens.forEach(filter => {
                let title = filter.querySelector("h3").textContent

                // If the card title includes the typed value, the card becomes visible again.
                if(title.includes(value)){
                    filter.style.display = "block"
                }

                // When the search box is empty, all cards are shown again.
                if(searchBox.value == '') {
                    filter.style.display = "block"
                }
            })
        }
