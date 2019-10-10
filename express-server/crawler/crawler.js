const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const spotify = function () {
  request({
    url: "https://spotifycharts.com/regional/", // Spolify
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
    const result = []; // 建立一個儲存結果的容器
    const table1 = $(".chart-table-track strong"); 
    const table2 = $(".chart-table-track span");

    for (let i = 0; i < table1.length; i++) { 
        const song_name = table1.eq(i).text();
        const singer = table2.eq(i).text();
      // 建立物件並(push)存入結果
      result.push(Object.assign({ song_name, singer }));
    }
    // 在終端機(console)列出結果
    console.log(result);
    //寫入 result.json 檔案
    //fs.writeFileSync("result.json", JSON.stringify(result));
  });
};

const kkbox = function () {
    request({
      url: "https://www.kkbox.com/tw/tc/playlist/LZPhK2EyYzN15dU-PT", // Spolify
      method: "GET",
    }, function (error, response, body) {
      if (error || !body) {
        return;
      }
      const $ = cheerio.load(body); // 載入 body
      const result = []; // 建立一個儲存結果的容器
      const table1 = $("a.song-title"); // 爬最外層的 Table(class=BoxTable) 中的 tr
      const table2 = $(".song-artist-album a");

      //console.log(table1.text());
  
      for (let i = 0; i < table1.length; i++) { // 走訪 tr
          const song_name = table1.eq(i).attr('title');
          const singer = table2.eq(i).attr('title');
        // 建立物件並(push)存入結果
        result.push(Object.assign({ song_name, singer}));
      }
      // 在終端機(console)列出結果
      console.log(result);
      // 寫入 result.json 檔案
      //fs.writeFileSync("result.json", JSON.stringify(result));
    });
};

const billboard = function () {
    request({
      url: "https://www.billboard.com/charts/hot-100", // billboard
      method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
        const table1 = $("span.chart-element__information__song"); 
        const table2 = $("span.chart-element__information__artist");
  
        //console.log(table1.text());
      
      for (let i = 0; i < table1.length; i++) { 
            const song_name = table1.eq(i).text();
            const singer = table2.eq(i).text();
            //console.log(song_name);
        // 建立物件並(push)存入結果
        result.push(Object.assign({ song_name, singer }));
      }
      // 在終端機(console)列出結果
      console.log(result);
      //寫入 result.json 檔案
      //fs.writeFileSync("result.json", JSON.stringify(result));
    });
};

const melon = function () {
    request({
        url: "https://www.melon.com/chart/index.htm", // billboard
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        }
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
        const table1 = $("div.ellipsis.rank01 span a"); 
        const table2 = $("div.ellipsis.rank02 span a");
      
        for (let i = 0; i < table1.length; i++) { 
            const song_name = table1.eq(i).text();
            const singer = table2.eq(i).text();
            //console.log(song_name);
        // 建立物件並(push)存入結果
        result.push(Object.assign({ song_name, singer }));
      }
      // 在終端機(console)列出結果
      console.log(result);
      //寫入 result.json 檔案
      //fs.writeFileSync("result.json", JSON.stringify(result));
    });
};

const QQmusic = function(){
    request({
        url: "https://y.qq.com/n/yqq/toplist/4.html",
        method: "GET"
    }, function(error, response, body) {
        if(error || !body) {
            return;
        }

        const $ = cheerio.load(body);
        const result = [];
        const table1 = $(".js_song");

        console.log($.text());
        console.log(table1.text());

        console.log(table1.eq(0).attr('title'));

        for(let i = 0; i < table1.length; i++) {
            const song_name = table1.eq(i).text();
			
            console.log(song_name);
        }


    });
};


	spotify();
	kkbox();
	billboard();
	melon();


// 每半小時爬一次資料
//setInterval(kkbox, 30 * 60 * 1000);