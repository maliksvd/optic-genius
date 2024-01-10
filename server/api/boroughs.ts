interface Borough {
  name: string;
  value: string;
  lat: number;
  long: number;
}

interface City {
  city: string;
  boroughs: Borough[];
}

export default defineEventHandler(async (event) => {  
  const items: City[] = [
    {
      city: 'montreal',
      boroughs: [
        {
          "name": "Anjou",
          "value": "anjou",
          "lat": 45.6091,
          "long": -73.5493
        },
        {
          "name": "Côte-des-Neiges–Notre-Dame-de-Grâce",
          "value": "cdn-ndg",
          "lat": 45.4922,
          "long": -73.6311
        },
        {
          "name": "Lachine",
          "value": "lachine",
          "lat": 45.4358,
          "long": -73.6853
        },
        {
          "name": "LaSalle",
          "value": "lasalle",
          "lat": 45.4255,
          "long": -73.6668
        },
        {
          "name": "Le Plateau-Mont-Royal",
          "value": "le-plateau",
          "lat": 45.5203,
          "long": -73.5873
        },
        {
          "name": "Le Sud-Ouest",
          "value": "le-sud-ouest",
          "lat": 45.4725,
          "long": -73.5885
        },
        {
          "name": "Mercier–Hochelaga-Maisonneuve",
          "value": "mercier-hochelaga",
          "lat": 45.5691,
          "long": -73.5453
        },
        {
          "name": "Montréal-Nord",
          "value": "montreal-nord",
          "lat": 45.6075,
          "long": -73.6297
        },
        {
          "name": "Outremont",
          "value": "outremont",
          "lat": 45.5168,
          "long": -73.6104
        },
        {
          "name": "Pierrefonds-Roxboro",
          "value": "pierrefonds-roxboro",
          "lat": 45.4945,
          "long": -73.8506
        },
        {
          "name": "Rivière-des-Prairies–Pointe-aux-Trembles",
          "value": "riviere-des-prairies",
          "lat": 45.6583,
          "long": -73.5201
        },
        {
          "name": "Rosemont–La Petite-Patrie",
          "value": "rosemont-la-petite-patrie",
          "lat": 45.5504,
          "long": -73.5738
        },
        {
          "name": "Saint-Laurent",
          "value": "saint-laurent",
          "lat": 45.5089,
          "long": -73.7124
        },
        {
          "name": "Saint-Léonard",
          "value": "saint-leonard",
          "lat": 45.5808,
          "long": -73.5967
        },
        {
          "name": "Verdun",
          "value": "verdun",
          "lat": 45.4598,
          "long": -73.5712
        },
        {
          "name": "Ville-Marie",
          "value": "ville-marie",
          "lat": 45.5058,
          "long": -73.5538
        },
        {
          "name": "Villeray–Saint-Michel–Parc-Extension",
          "value": "villeray",
          "lat": 45.5599,
          "long": -73.6177
        },
        {
          "name": "Westmount",
          "value": "westmount",
          "lat": 45.4866,
          "long": -73.5962
        }
      ]      
    },
  ];

  const { city } = getQuery(event);

  if (city !== undefined) {
    const cityItem = items.find((item) => item.city === city);

    if (cityItem) {
      return { boroughs: cityItem.boroughs };
    }
  }
 
  
  

});
