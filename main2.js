$('#search-button').click(function () {
    const pokemonName = $('#search-box').val();
    const pokemonNameLower = pokemonName.toLowerCase();

    console.log(pokemonNameLower)
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonNameLower}/`,
        dataType: "json",
        success: function (res) {
            console.log(res);
            pokedex(res);
            $.ajax({
                type: "GET",
                url: res.abilities[0].ability.url,
                dataType: "json",
                success: function (yes) {
                    let efectos = yes.effect_entries[0].effect
                    $('#pokemonText').text("Extracto: " + efectos);
                }
            })
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
    var data_types = pokemonTypes;
    for (i = 0; i < data_types.length; i++){
data_types[i].label = data_types[i]['types'].name[1];
    }

});


function pokedex(data) {
    $('#pokedex-info-containter').empty();

    const pokemonImg = data.sprites.front_default;
    const pokemonName = data.name;
    const pokemonNumber = data.id;
    const pokemonWeight = data.weight;
    const pokemonAbbilities = data.abilities[0].ability.name;
    const pokemonTypes = data.types;

    const pokemonSPD = data.stats[0].base_stat;
    const pokemonSD = data.stats[1].base_stat;
    const pokemonSA = data.stats[2].base_stat;
    const pokemonDFS = data.stats[3].base_stat;
    const pokemonATK = data.stats[4].base_stat;
    const pokemonHP = data.stats[5].base_stat;

    $("#pokedex-screen-image").attr("src", pokemonImg);
    $('#pokemonName').text("Nombre: " + pokemonName);
    $('#pokemonNumber').text("Número: " + pokemonNumber);
    $('#pokemonWeight').text("Peso: " +
        pokemonWeight);
    $('#pokemonTypes').text("Tipo: " + pokemonTypes);
    $('#pokemonAbbilities').text("Habilidad: " +
        pokemonAbbilities);


    var chart = new CanvasJS.Chart("pokemongrafico", {
        title: {
            text: "Desempeño:"
        },
        data: [{
            type: "column",
            dataPoints: [{
                    label: "speed",
                    y: pokemonSPD,
                },
                {
                    label: "special-defense",
                    y: pokemonSD,
                },
                {
                    label: "special-attack",
                    y: pokemonSA,
                },
                {
                    label: "defense",
                    y: pokemonDFS,
                },
                {
                    label: "attack",
                    y: pokemonATK,
                },
                {
                    label: "hp",
                    y: pokemonHP,
                }
            ]
        }]
    });
    chart.render();
}