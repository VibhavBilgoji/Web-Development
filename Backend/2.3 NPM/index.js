import generateName from "sillyname";
import {randomSuperhero} from 'superheroes';

var superHeroName = randomSuperhero();
var sillyName = generateName();
console.log("My silly name is " + sillyName);
console.log(`My superhero name is ${superHeroName}`);