/* STARTER */
import crispyKangkong from '../assets/products/crispy-kangkong.jpg'
import friedTawilis from '../assets/products/fried tawilis.jpg';
import crunchyMushoom from  '../assets/products/crunchy mushroom.jpg';
import onionRings from '../assets/products/onion rings.jpg';
import calamares from '../assets/products/calamares.jpg';
import nilasingNaHipon from '../assets/products/nilasing na hipon.jpg';
import camaronRebosado from '../assets/products/camaron rebosado.jpg';
import beefShanghai from '../assets/products/beef shanghai.jpg';
import frenchFries from '../assets/products/french fries.jpg';

/* VEGETARIAN */
import vegetarianTapa from '../assets/products/vegetarian tapa.jpg'
import sizzlingVegelonaSteak from '../assets/products/sizzling vegelona steak.jpg'
import sizzlingTofu from '../assets/products/sizzling tofu.jpg';
import vegemeatCurry from '../assets/products/vegemeat curry.jpg';
import vegetarianTocino from '../assets/products/vegetarian tocino.jpg';
import vegemeatCaldereta from '../assets/products/vegemeat caldereta.jpg';
import tofuCurry from '../assets/products/tofu curry.jpg';
import tofuInTausi from '../assets/products/tofu in tausi.jpg';
import vegemeatInMushroomSauce from '../assets/products/vegemeat in mushroom sauce.jpg';

/* Marios Favorite Chicken */
import friedChicken from '../assets/products/fried chicken.jpg';
import garlicChicken from '../assets/products/garlic chicken.jpg';
import butteredGarlicChicken from '../assets/products/buttered garlic chicken.jpg';
import spicyChicken from '../assets/products/spicy chicken.jpg';
import butteredChicken from '../assets/products/buttered chicken.jpg';
import saltedEggChicken from '../assets/products/salted egg chicken.jpg';

/* Chicken */
import bicolExpressChicken from '../assets/products/bicol express chicken.jpg';
import chickenTinola from '../assets/products/chicken tinola.jpg';
import sinigangNaManok from '../assets/products/sinigang na manok.jpg';
import chickenCurry from '../assets/products/chicken curry.jpg';
import chickenAdobo from '../assets/products/chicken adobo.jpg';
import pineappleChikcen from '../assets/products/pineapple chicken.jpg';

/* Beef */
import bulaloSteak from '../assets/products/bulalo steak.jpg';
import bulaloBatangas from '../assets/products/bulalo batangas.jpg';
import beefCaldereta from '../assets/products/beef caldereta.jpg';
import bulaloSinigang from '../assets/products/bulalo sinigang.jpg';
import beefBroccoli from '../assets/products/beef broccoli.jpg';
import beefSteakTagalog from '../assets/products/beef steak tagalog.jpg';
import bulaloPares from '../assets/products/bulalo pares.jpg';
import beefSalpicao from '../assets/products/beef salpicao.jpg';
import bulaloKareKare from '../assets/products/bulalo kare-kare.jpg';
import beefAmpalaya from '../assets/products/beef ampalaya.jpg';

/* Fish */
import bangusBellyKilawin from '../assets/products/bangus belly kilawin.jpg';
import sinigangNaBangus from '../assets/products/sinigang na bangus.jpg';
import bakedBangus from '../assets/products/baked bangus.jpg';
import bangusAlaPobre from '../assets/products/bangus ala pobre.jpg';
import pinaputoNaTilapia from '../assets/products/pinaputok na tilapia.jpg';
import steamedLapuLapu from '../assets/products/steamed lapu-lapu.jpg';
import friedTilapia from '../assets/products/fried tilapia.jpg';
import friedLapuLapu from '../assets/products/fried lapu-lapu.jpg';

export const availCategories = ["starter", "vegetarian", "chicken", "mario's favorite chicken", "beef", "fish", "seafood", "sizzling options", "vegetables", "noodles", "soup", "couple meal-1", "couple meal-2", "couple meal-3", "couple meal-4", "set meal-A", "set meal-A", "set meal-B", "set meal-C", "mario's bilao-A", "mario's bilao-B", "coffee & milktea", "beers & buckets"];

export const availRecipes = [
    /* Starter */
    {
      recipeName: 'calamares',
      price: 380,
      image: calamares,
      category: "starter",
      limit: '3-4 PAX',
      quantity: 1,
      hearts: 0,
    },
    {
      recipeName: 'fried tawilis',
      price: 385,
      image: friedTawilis,
      category: "starter",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'onion rings',
      price: 270,
      image: onionRings,
      category: "starter",
      limit: '3-4 PAX',
      hearts: 0
    },
    {
      recipeName: 'crispy kangkong',
      price: 225,
      image: crispyKangkong,
      category: "starter",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'crunchy mushroom',
      price: 270,
      image: crunchyMushoom,
      category: "starter",
      limit: '3-5 PAX',
      hearts: 0
    },

    {
      recipeName: 'nilasing na hipon',
      price: 460,
      image: nilasingNaHipon,
      category: "starter",
      limit: '4-5 PAX',
      hearts: 0
    },
    
    {
      recipeName: 'camaron rebosado',
      price: 480,
      image: camaronRebosado,
      category: "starter",
      limit: '3-4 PAX',
      hearts: 0
    },
    
    {
      recipeName: 'beef shanghai',
      price: 290,
      image: beefShanghai,
      category: "starter",
      limit: '3-4 PAX',
      hearts: 0
    },
    {
      recipeName: 'french fries',
      price: 290,
      image: frenchFries,
      category: "starter",
      limit: '3-4 PAX',
      hearts: 0
    },

    /* Vegetarian */
    {
      recipeName: 'tofu curry',
      price: 395,
      image: tofuCurry,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'sizzling tofu',
      price: 395,
      image: sizzlingTofu,
      category: "vegetarian",
      limit: '3-4 PAX',
      hearts: 0
    },
    {
      recipeName: 'tofu in tausi',
      price: 395,
      image: tofuInTausi,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },
    
    {
      recipeName: 'sizzling vegelona steak',
      price: 395,
      image: sizzlingVegelonaSteak,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'vegetarian tocino',
      price: 380,
      image: vegetarianTocino,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'vegemeat caldereta',
      price: 395,
      image: vegemeatCaldereta,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'vegemeat in mushroom sauce',
      price: 375,
      image: vegemeatInMushroomSauce,
      category: "vegetarian",
      limit: '3-5 PAX',
      hearts: 0
    },

    /* Chicken */
    {
      recipeName: 'chicken tinola',
      price: 520,
      image: chickenTinola,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'chicken adobo',
      price: 475,
      image: chickenAdobo,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'chicken curry',
      price: 550,
      image: chickenCurry,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'sinigang na manok',
      price: 520,
      image: sinigangNaManok,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'bicol express chicken',
      price: 550,
      image: bicolExpressChicken,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },
    {
      recipeName: 'pineapple chicken',
      price: 550,
      image: pineappleChikcen,
      category: "chicken",
      limit: '4-5 PAX',
      hearts: 0
    },


    /* Mario's Favorite Chicken */
    {
      recipeName: 'fried chicken',
      price: {
        whole: 680,
        half: 350
      },
      image: friedChicken,
      category: "mario's favorite chicken",
      limit: {
        whole: "6-5 PAX",
        half: "2-3 PAX"
      },
      hearts: 0
    },
    {
      recipeName: 'garlic chicken',
      price: {
        whole: 750,
        half: 385
      },
      image: garlicChicken,
      category: "mario's favorite chicken",
      limit: {
        whole: "7-8 PAX",
        half: "3-4 PAX"
      },
      hearts: 0
    },

    {
      recipeName: 'spicy chicken',
      price: {
        whole: 750,
        half: 385
      },
      image: spicyChicken,
      category: "mario's favorite chicken",
      limit: {
        whole: "7-8 PAX",
        half: "3-4 PAX"
      },
      hearts: 0
  },
    {
        recipeName: 'buttered garlic chicken',
        price: {
          whole: 750,
          half: 385
        },
        image: friedChicken,
        category: "mario's favorite chicken",
        limit: {
          whole: "7-8 PAX",
          half: "3-4 PAX"
        },
        hearts: 0
    },
    
    {
        recipeName: 'buttered chicken',
        price: {
          whole: 750,
          half: 385
        },
        image: butteredChicken,
        category: "mario's favorite chicken",
        limit: {
          whole: "7-8 PAX",
          half: "3-4 PAX"
        },
        hearts: 0
    },

    {
        recipeName: 'salted egg chicken',
        price: {
          whole: 750,
          half: 385
        },
        image: saltedEggChicken,
        category: "mario's favorite chicken",
        limit: {
          whole: "7-8 PAX",
          half: "3-4 PAX"
        },
        hearts: 0
    },

    /* Beef */
    {
      recipeName: 'bulalo steak',
      price: 695,
      image: bulaloSteak,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'bulalo pares',
      price: 695,
      image: bulaloPares,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'beef caldereta',
      price: 560,
      image: beefCaldereta,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'bulalo batangas',
      price: 695,
      image: bulaloBatangas,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'bulalo sinigang',
      price: 695,
      image: bulaloSinigang,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'beef broccoli',
      price: 595,
      image: beefBroccoli,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'beef steak tagalog',
      price: 495,
      image: beefSteakTagalog,
      category: "beef",
      limit: "3-4 PAX",
      hearts: 0
    },
    {
      recipeName: 'bulalo kare-kare',
      price: 750,
      image: bulaloKareKare,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'beef salpicao',
      price: 550,
      image: beefSalpicao,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'beef ampalaya',
      price: 540,
      image: beefAmpalaya,
      category: "beef",
      limit: "4-5 PAX",
      hearts: 0
    },

    /* Fish */
    {
      recipeName: 'sinigang na bangus',
      price: 495,
      image: sinigangNaBangus,
      category: "fish",
      limit: "3-4 PAX",
      hearts: 0
    },
    {
      recipeName: 'baked bangus',
      price: 650,
      image: bakedBangus,
      category: "fish",
      limit: "3-4 PAX",
      hearts: 0
    },
    {
      recipeName: 'bangus ala pobre',
      price: 550,
      image: bangusAlaPobre,
      category: "fish",
      limit: "3-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'bangus belly kilawin',
      price: 395,
      image: bangusBellyKilawin,
      category: "fish",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'pinaputok na tilapia',
      price: 450,
      image: pinaputoNaTilapia,
      category: "fish",
      limit: "3-4 PAX",
      hearts: 0
    },
    {
      recipeName: 'steamed lapu-lapu',
      price: 1250,
      image: steamedLapuLapu,
      category: "fish",
      limit: "4-5 PAX",
      hearts: 0
    },
    {
      recipeName: 'fried tilapia w/ mango salsa',
      price: 675,
      image: friedTilapia,
      category: "fish",
      limit: "3-4 PAX",
      hearts: 0
    },
    {
      recipeName: 'fried lapu-lapu w/ mango salsa',
      price: 1350,
      image: friedLapuLapu,
      category: "fish",
      limit: "4-5 PAX",
      hearts: 0
    },
    

    
  ]