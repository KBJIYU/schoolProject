var cities = new L.LayerGroup();


// token
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

// 底圖設置
var grayscale = L.tileLayer(mbUrl, {
        id: 'mapbox.light',
        attribution: mbAttr
    }),
    streets = L.tileLayer(mbUrl, {
        id: 'mapbox.streets',
        attribution: mbAttr
    });

// L.marker([25.087818, 121.538607]).bindPopup('這是你輸入的位置').addTo(cities),

//設function resetHighlight(e)，用於當mouseout的時候，還原最初之樣式設定。
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();

}
//設function zoomToFeature(e)，用於當clik listener啟動時，放大物件。
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
//設function onEachFeature(feature, layer)，用於加入the listeners等事件。
function onEachFeature2(feature, layer) {

    var popupContent = "<p>這裡是 " +
        feature.properties.Name + "~~喔。<br>" +
        feature.properties.Descriptio + "簡介不錯吧</p>";

    layer.bindPopup(popupContent);
}



// 選項1
var baseLayers = {
    "灰色底圖": grayscale,
    "街道底圖": streets
};
// 選項2
var overlays = {
    "河濱公園": cities,
};

//地圖輸出之div設定
var map03 = L.map('map-3', {
    center: [25.087818, 121.538607],
    zoom: 11,
    layers: [grayscale, cities]
});
// 控制選項
L.control.layers(baseLayers, overlays).addTo(map03);

// load geojson檔案
L.geoJson(tpeRiverPark, {
    onEachFeature: onEachFeature2,
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
  				fillColor: "#ff7800",
  				color: "#000",
  				weight: 1,
  				opacity: 1,
  				fillOpacity: 0.8
        });
    }
}).addTo(cities);
