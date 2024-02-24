var el = document.getElementById("screen");
var boutonHautEl = document.getElementById("haut");
var boutonDroiteEl = document.getElementById("droite");
var boutonBasEl = document.getElementById("bas");
var boutonGaucheEl = document.getElementById("gauche");
var position = {x:1,y:1};
var positionTemp = {x:1,y:1}
var obstacles = new Array (15); 
var herbes = new Array (15);

function random(min, max) 
{
    return Math.floor(min + Math.random() * (max - min + 1));
}

var OnClickHaut = function() 
{
    positionTemp.x = position.x;
    positionTemp.y = position.y;
    positionTemp.x -= 1
    if(obstacles[positionTemp.x][positionTemp.y]==false)
    {
        position.x = positionTemp.x;
        position.y = positionTemp.y;
    }
    afficherCarte();
    setTimeout(testRencontrePokemon,1000);
};
var OnClickDroite = function() 
{
    positionTemp.x = position.x;
    positionTemp.y = position.y;
    positionTemp.y += 1
    if(obstacles[positionTemp.x][positionTemp.y]==false)
    {
        position.x = positionTemp.x;
        position.y = positionTemp.y;
    }
    afficherCarte();
    setTimeout(testRencontrePokemon,1000);
};
var OnClickBas = function() 
{
    positionTemp.x = position.x;
    positionTemp.y = position.y;
    positionTemp.x += 1
    if(obstacles[positionTemp.x][positionTemp.y]==false)
    {
        position.x = positionTemp.x;
        position.y = positionTemp.y;
    }
    afficherCarte();
    setTimeout(testRencontrePokemon,1000);
};
var OnClickGauche = function() 
{
    positionTemp.x = position.x;
    positionTemp.y = position.y;
    positionTemp.y -= 1
    if(obstacles[positionTemp.x][positionTemp.y]==false)
    {
        position.x = positionTemp.x;
        position.y = positionTemp.y;
    }
    afficherCarte();
    setTimeout(testRencontrePokemon,1000);
};

// affichage de la carte
function afficherCarte()
{
    var str = "";
    for(var i = 0; i < 15 ; i++)
    {
        for(var j = 0; j < 15; j++)
        {
            if(obstacles[i][j]==true)
            {
                str+= "🟫";
            }
            else if (position.x == i && position.y == j)
            {
                str += "🧍‍♂️";
            }
            else if(herbes[i][j]==true)
            {
                str += "🌱";
            }
            else
            {
                str += "⬜";
            }
        }
        str += "<br>";
    }
    el.innerHTML = str;
}

function testRencontrePokemon()
{
    var pokemon = {nom:"", pointsVie:0 , pointsVieMax:0};
    var nbrAleatoire;
    if(herbes[position.x][position.y]==true)
    {
        nbrAleatoire = random(1,10);

        if(nbrAleatoire <= 3)
        {
            // choix du pokemon
            nbrAleatoire = random(1,3);

            switch(nbrAleatoire)
            {
                case 1:
                    pokemon.pointsVie = pokemon.pointsVieMax = 30;
                    pokemon.nom = "Roucoups";
                    break;
                case 2: 
                    pokemon.pointsVie = pokemon.pointsVieMax = 35;
                    pokemon.nom = "Ratata";
                    break;
                case 3:
                    pokemon.pointsVie = pokemon.pointsVieMax = 40;
                    pokemon.nom = "Miaouss";
                    break;
            }
            alert("un " + pokemon.nom + " apparait");
            combatPokemon(pokemon);
        }
    }
}

function combatPokemon(pokemon)
{
    var choixAction;
    var captured = false;
    var nbrAleatoire;
    do
    {
        do
        {
            choixAction = parseInt(prompt("point de vie = " + pokemon.pointsVie + "\nChoisir une action \n1. Attaque normale\n2. Attaque puissante\n3. Lancer Pokeball"))

        }while(choixAction < 1 || choixAction > 3);

        switch(choixAction)
        {
            case 1: 
                pokemon.pointsVie -= random(4,7);
                break;
            case 2:
                pokemon.pointsVie -= random(10,14);
                break;
            case 3:
                nbrAleatoire = random(1,10);
                if(pointsVie/pointsVieMax > 0.7)
                {
                    captured = nbrAleatoire == 1
                }
                else if(pokemon.pointsVie/pokemon.pointsVieMax >= 0.4 && pokemon.pointsVie/pokemon.pointsVieMax <= 0.7 )
                {
                    captured = nbrAleatoire <= 5;
                }
                else
                {
                    captured = nbrAleatoire <=9;
                }
                break;
        }

    } while(!captured && pokemon.pointsVie > 0);

    if(pokemon.pointsVie <= 0)
    {
        alert(pokemon.nom + " est ko !");
    }
    else
    {
        alert(pokemon.nom + " est capturé !");
    }
}


boutonHautEl.addEventListener("click",OnClickHaut);
boutonDroiteEl.addEventListener("click",OnClickDroite);
boutonBasEl.addEventListener("click",OnClickBas);
boutonGaucheEl.addEventListener("click",OnClickGauche);

function jeuPokemon()
{
    for(var i = 0 ;i < 15; i++)
    {
        obstacles[i] = new Array(15);
        herbes[i] = new Array(15);
    }

    for(var i = 0; i < 15 ; i ++)
    {
        for(var j = 0; j < 15; j++)
        {
            if(i==0 || i == 14 || j==0 || j==14)
            {
                obstacles[i][j]=true;
            }
            else
            {
                obstacles[i][j]=false;
            }
            if(i>=4 && i<=10 && j>=4 && j<=10)
            {
                herbes[i][j] = true;
            }
            else
            {
                herbes[i][j]=false;
            }
        }
    }
    afficherCarte();
}

jeuPokemon();


