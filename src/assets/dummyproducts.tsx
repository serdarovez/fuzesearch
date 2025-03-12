import president from "./president.jpg";
import bars from "./bars.jpg";
import eklin from "./eklin.jpg";
import nesquick from "./nesquick.jpg";
import nutella from "./nutella.jpg";
import peynir from "./peynir.jpg";
import pinar from "./pinar.jpg";
import ramak from "./ramak.jpg";
import razavi from "./razavi.jpg";
import sabah from "./sabah.jpg";
import valio from "./valio.jpg";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  position: string;
}

// Dummy products array with local image references (TypeScript version)
const products: Product[] = [
  {
    id: 1,
    name: "President",
    description: "Wetçinaly dilimlenen ereme peýnir President 150 gr",
    image: president,
    price: 30,
    position: "main",
  },
  {
    id: 2,
    name: "Sabah",
    description: "Duzlanan peýniri Sabah 350 gr",
    image: sabah,
    price: 89,
    position: "main",
  },
  {
    id: 3,
    name: "Valio",
    description: "Ereme peynir Valio 200gr",
    image: valio,
    price: 42,
    position: "main",
  },
  {
    id: 4,
    name: "Täze aý süýt",
    description: "Ereme peýniri Täze Aý ýaglylygy 30% 100 gr",
    image: peynir,
    price: 13,
    position: "main",
  },
  {
    id: 5,
    name: "Nutella",
    description: "Toplum Nutella & Go 52gr",
    image: nutella,
    price: 31,
    position: "main",
  },
  {
    id: 6,
    name: "Nesquick",
    description: "Ertirlik Nesquick 310gr",
    image: nesquick,
    price: 62,
    position: "main",
  },
  {
    id: 7,
    name: "Pinar",
    description: "Sygyr suydi Pinar",
    image: pinar,
    price: 37,
    position: "main",
  },
  {
    id: 8,
    name: "Bars",
    description: "Shokolad pastasy Bars",
    image: bars,
    price: 37,
    position: "main",
  },
  {
    id: 9,
    name: "Eklin",
    description: "Shokolad pastasy Eklin",
    image: eklin,
    price: 20,
    position: "main",
  },
  {
    id: 10,
    name: "Ramak",
    description: "Feta peyniri Ramak",
    image: ramak,
    price: 16,
    position: "main",
  },
  {
    id: 11,
    name: "Razavi",
    description: "Sygyr suydi Razavi ",
    image: razavi,
    price: 16,
    position: "main",
  },
  {
    id: 12,
    name: "Sabah",
    description: "Duzlanan peýniri Sabah 350 gr",
    image: sabah,
    price: 79,
    position: "second",
  },
  {
    id: 13,
    name: "Valio",
    description: "Ereme peynir Valio 200gr",
    image: valio,
    price: 52,
    position: "second",
  },
  {
    id: 14,
    name: "Täze aý süýt",
    description: "Ereme peýniri Täze Aý ýaglylygy 30% 100 gr",
    image: peynir,
    price: 23,
    position: "second",
  },
  {
    id: 15,
    name: "Nutella",
    description: "Toplum Nutella & Go 52gr",
    image: nutella,
    price: 21,
    position: "second",
  },
  {
    id: 16,
    name: "Nesquick",
    description: "Ertirlik Nesquick 310gr",
    image: nesquick,
    price: 52,
    position: "second",
  },
  {
    id: 17,
    name: "Pinar",
    description: "Sygyr suydi Pinar",
    image: pinar,
    price: 47,
    position: "second",
  },
  {
    id: 18,
    name: "Bars",
    description: "Shokolad pastasy Bars",
    image: bars,
    price: 17,
    position: "second",
  },
  {
    id: 19,
    name: "Eklin",
    description: "Shokolad pastasy Eklin",
    image: eklin,
    price: 40,
    position: "second",
  },
  {
    id: 20,
    name: "Ramak",
    description: "Feta peyniri Ramak",
    image: ramak,
    price: 6,
    position: "second",
  },
  {
    id: 21,
    name: "Razavi",
    description: "Sygyr suydi Razavi ",
    image: razavi,
    price: 10,
    position: "second",
  },
];

export default products;
