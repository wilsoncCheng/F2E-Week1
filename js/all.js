const textSearch = document.querySelector('.textSearch');
const regionSearch = document.querySelector('.regionSearch');
let cacheData = '';
let region = [];
regionFilter()
function init1() {
  axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${cacheData}?$top=30&$format=JSON`,
    {
      headers: getAuthorizationHeader()
    }
  )
    .then(function (response) {
      thisData = response.data;
      let str = "";
      thisData.forEach(item => {
        console.log(item)
        str += `
        <li class="ticketCard mt-3"> 
      <div class="ticketCard-img">
        <a href="${item.WebsiteUrl}" target=_blank>
          <img src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}" style="list-style:none;">
        </a>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name"  data-bs-toggle="modal" data-bs-target="#${item.ID}"></i>${item.Name}</a>
          </h3>
          <p class="ticketCard-description">
          ${item.City}
          </p>
        </div>
      </div>
   </li> 
   <div class="modal fade" id="${item.ID}">
   <div class="modal-dialog" style="margin:50px 40% 50px auto">
       <div>
           <div class="modal-content" style="width: 800px;height: auto;padding: 20px;">
               <!-- Header -->
                   <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
               <div class="modal-header">
               <img src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}" style="list-style:none;">
               </div>
               <!-- Body -->
               <div class="modal-body">
               <h3>
            ${item.Name}
             </h3>
             ${item.DescriptionDetail}<br/><br/>
             <table style="width: 100%;border-spacing:20px 5px;" cellspacing="30px">
             <tr>
                 <td Style="width:50%;">電話：${item.Phone}</td>
                 <td Style="width:50%;">營業時間：${item.OpenTime}</td>
             </tr>
             <tr>
             <td Style="width:50%;">類別：${item.Class2}</td>
             <td Style="width:50%;">分級：${item.Level}</td>
         </tr>
             
         </table>
               </div>
           </div>
       </div>
   </div>
</div>`;
      })
      list.innerHTML = str;

    });
}
init1()
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = 'a1ef8e983fe74d35a181e54ffdfe1513';
  let AppKey = 'D5BfFgftgudereu1z8gl0JGFcic';
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString };
}

regionSearch.addEventListener('change', function (e) {
  const area = e.target.value;
  if (area === '') {
    // 全部地區
    cacheData = Taipei;
  } else {
    cacheData = area;
  }
  console.log(cacheData)
  init1();
  window.onload;
});
function regionFilter() {
  axios.get(
    `https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON`,
    {
      headers: getAuthorizationHeader()
    }
  )
    .then(function (response) {
      const thisData1 = response.data;
      let str1 = "";
      thisData1.forEach(item => {
        console.log(item.CityName)
        let region = [];
        region.push(item.City);
        region.forEach((item) => {
          str1 += `
                <option value="${item}" class="regionOption">${item}</option>`
        })
        regionSearch.innerHTML = str1;
      });
    });
}

