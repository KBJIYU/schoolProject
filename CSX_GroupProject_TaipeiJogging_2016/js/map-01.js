//1.設定主要的地圖div id , 地圖中心點顯示位置
var map = L.map('map-leaflet').setView([25.087818, 121.538607], 11);
//2.token跟，下方的提供者來源，記得要改
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
}).addTo(map);

//設var info
var info = L.control();

//設function getColor，用於顏色設定變數
function getColor(d) {
    return d == 6300001 ? '#fe2a69' :
        d == 6300002 ? '#f7aa15' :
        d == 6300003 ? '#fffd47' :
        d == 6300004 ? '#4aba58' :
        d == 6300005 ? '#13dfdf' :
        d == 6300006 ? '#2a3580' :
        d == 6300007 ? '#a746eb' :
        d == 6300008 ? '#a80000' :
        d == 6300009 ? '#035522' :
        d == 6300010 ? '#46588e' :
        d == 6300011 ? '#74ff71' :
        d == 6300012 ? '#ff2d11' :
        '#000000';
}
//設function style ，用於設定geojson各個資料的，各種CSS屬性。
function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3,
        fillColor: getColor(feature.properties.towncode)
    };
}

function style2(feature) {
    return {
        weight: 2,
        opacity: 0.4,
        color: 'red',
    };
}

function style3(feature) {
    return {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

//設function highlightFeature(e)，用於當hover的時候，物件樣式改變之設定。
function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
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
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature

    });
}

//透過.onAdd = function(map) 來設定控制control後的資訊輸出位置?!
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
//透過.update =function(props) 來設定輸出的DIV，當中的屬性跟資訊更新
info.update = function(props) {
    this._div.innerHTML = '<h4>台北行政區</h4>' + (props ?
        '<b>' + props.countyname + '</b><br />' + props.townname :
        'Hover over a state');
};

info.addTo(map);

//透過L.geoJson 來指定到下方這個geojson資料當中。並將style屬性的資料連結為上方的function style，最後attTo(map)這個div中。
var geojson2 = L.geoJson(tpeMrt, {
    style: style2,
}).addTo(map);


var geojson = L.geoJson(tpeArea, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
