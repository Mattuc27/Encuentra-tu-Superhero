$(document).ready(function(){
  $("button").on("click", function(){
    var valueInput = ($("input").val());

    if(valueInput > 731){
      alert("El número ingresado debe estar entre 1 y 731.");
    }

    $.ajax({
      type: "GET",
      url: "https://www.superheroapi.com/api.php/10226187018603252/"+valueInput,
      datatype: "JSON",
      success: function(data){
        let nombre = data.name;
        let imagen = data.image.url;
        let conexiones = data.connections.relatives;
        let publicado = data.biography.publisher;
        let ocupacion = data.work.ocuppation;
        let altura = data.appearance.height;
        let peso = data.appearance.weight;
        let alianzas = data.biography.aliases;

        $('#hero-labels').html(`
          <div class="card mb-3 my-4">
            <div class="row g-0">
            <div class="col-md-4">
              <img class="img-fluid rounded-start" src="${imagen}">
            </div>
            <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text"><b>Conexiones: </b> ${conexiones}</p>
              <p class="card-text"><b>Publicado por: </b> ${publicado}</p>
              <p class="card-text"><b>Ocupación: </b>${ocupacion}</p>
              <p class="card-text"><b>Altura: </b>${altura}</p>
              <p class="card-text"><b>Peso: </b>${peso}</p>
              <p class="card-text"><b>Alianzas: </b>${alianzas}</p>
            </div>
            </div>
            </div>
          </div>
        `);

        let config = {
          animationEnabled: true,
          title: {
            text: "Estadísticas"
          },
          axisY: {
            title: "Valor",
            includeZero: true
          },
          axisX: {
            title: ""
          },
          data: [
            {
              type: "column",
              dataPoints: [
                {label: "Inteligencia", y: Number(data.powerstats.intelligence)},
                {label: "Fuerza", y: Number(data.powerstats.strength)},
                {label: "Velocidad", y: Number(data.powerstats.speed)},
                {label: "Durabilidad", y: Number(data.powerstats.durability)},
                {label: "Poder", y: Number(data.powerstats.power)},
                {label: "Combate", y: Number(data.powerstats.combat)}
              ]
            }
          ]
        };

      let chart = new CanvasJS.Chart("hero-graphics", config)
      chart.render();
      },
    });
  });

});