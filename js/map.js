const paramid = location.pathname;
const iduser = paramid.substring(3);

document.body.onload = () => {
fetch('../php/lk/queryInfo/infouser.php?iduser='+encodeURIComponent(iduser),  {  
  method: 'GET',
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
}
          }).then(response => response.text()).then(result => maps(result))
}


function maps(result) {
  const parse = JSON.parse(result);
  ymaps.ready(init);
  function init() {
    let adress = parse['city'] + ' ' + parse['street'] + ' ' + parse['house']; 
    let myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });

    ymaps.geocode(adress).then(function(res) {
     
      let firstGeoObject = res.geoObjects.get(0);
      let coords = firstGeoObject.geometry.getCoordinates();
      myMap.setCenter(coords,18);

      
      myGeoObject = new ymaps.GeoObject();


  
      myMap.geoObjects
      .add(myGeoObject)

      .add(new ymaps.Placemark(coords, {
          balloonContent: 'мой адрес',
          iconCaption: parse['street'] + ' д.' + parse['house'] + ' кв.' + parse['flat']
      }, {
          preset: 'islands#greenDotIconWithCaption'
      }))
    }
    )
  }
}

