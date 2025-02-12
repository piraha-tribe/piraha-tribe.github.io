//  to do: customize marker icon
var currentLocation = "詳細資訊"; //這邊為asideMenu的標題

// 初始化 Leaflet 地圖
var mymap = L.map('mapid').setView([24.6417, 121.7632], 17);

// 建立 OpenStreetMap 圖層
var openStreetMap = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 18,
});

// // 建立 OpenTopoMap 地形圖層
// var openTopoMap = L.tileLayer(
//     'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     maxZoom: 18,
//     attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
// });

// 建立 ESRI 的 World Imagery（衛星影像）圖層
var esriWorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
});

// 預設加入 OpenStreetMap 圖層
openStreetMap.addTo(mymap);

// 建立圖層控制器
L.control.layers({
    "地圖": openStreetMap,
    "衛星影像圖": esriWorldImagery
}).addTo(mymap);



// 儲存標記資料，包括名稱、座標和圖片名稱
var markersData = [
  {
      coords: [24.642711809036193, 121.76634789702031],
      title: "丸山社區活動中心",
      pageName: "community-center.html"
  },
  {
      coords: [24.6429978496668, 121.76292686912502],
      title: "保安宮",
      pageName: "temple.html"
  },
  {
      coords: [24.641520420101532, 121.76312418886232],
      title: "聖母療養院",
      pageName: "hospital.html"
  },
  {
      coords: [24.643216589736806, 121.76302421662454],
      title: "聖心天主堂",
      pageName: "church.html"
  },
  {
      coords: [24.640715826549492, 121.76330983077179],
      title: "聖嘉民啟智中心",
      pageName: "disability.html"
  },
];



// 迴圈建立標記並綁定工具提示
markersData.forEach(function(data) {
  // 創建標記
  var marker = L.marker(data.coords).addTo(mymap);
  
  // 綁定工具提示
  marker.bindTooltip(
      `<b>${data.title}</b>`, 
      {
          permanent: false,
          direction: "top",
          className: "custom-tooltip"
      }
  );
  marker.on('click', function(e) {
    fetch(`./location-page/${data.pageName}`) // 讀取對應的 HTML 檔案
    .then(response => response.text()) // 轉換為純文字
    .then(html => {
      marker.bindPopup(html,{
        offset: L.point(0,0) //可以調整偏移位置
      }).openPopup(); // 綁定並顯示彈出視窗
    })
    .catch(error => {
      console.error('載入失敗:', error);
      marker.bindPopup('<b>載入錯誤</b><br>無法顯示內容。').openPopup();
    });
  });
});
