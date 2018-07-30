var App = (function (){

	_newsGet();
  $('#btn-mapChange').on('click', _SchoolMap);

  $('#btn-newsMsg').on('click', _NewsMsg);
  $('#btn-bookMsg').on('click', _BookMsg);
  $('#btn-ActivityMsg').on('click', _ActivityMsg);
  $('#btn-ClassMsg').on('click', _ClassMsg);
  $('#btn-LectureMsg').on('click', _LectureMsg);
  $('#btn-Exit').on('click', _ExitAction);



  function _BookMsg(){
        $('.carouselrow').html(`
          <div class="col-xs-12 col-sm-6" id="carouselrow">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="3" class="active"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="First slide" src="/images/c0427.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>歡迎成為暨大人!</h1>
                    <h4>107學年度大學個人申請入學招生於107年4月26日放榜。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Second slide" src="/images/c0523.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>中興新村風華再現共識論壇 </h1>
                    <h4>暨大邀集相關部會人員、里長、在地長輩、居民等，共同討論和激盪，為中興新村的可行之路，勾勒出具體可行的共識。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Third slide" src="/images/c0316.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>漫步春季 青春印「暨」</h1>
                    <h4>國立暨南國際大學春季健走活動於本月15日下午開跑。</h4>
                  </div>
                </div>
                <div class="carousel-item active">
                  <img class="img-responsive w-100" alt="Four slide" src="/images/c0227.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>暨大社會責任實踐深受肯定  全台唯一四案全數通過的一般大學</h1>
                    <h4>企盼藉由本次高教深耕計畫，積極建構大學社會責任的支持系統，培育出多元優質人才，提升國家整體競爭力!</h4>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div align="center">
              <h1>借閱資訊</h1>
            </div>
            <div class="card" id="bookmsg">
              <div class="card-header">
                <h1>姓名：朱育柔   學號：105213506</h1>
                <h1>系所：資管系碩二</h1>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color: red;">尚未歸還書目：</h2>
                    <li>深入淺出Android開發 &nbsp&nbsp 到期日：2018/07/23</li>
                    <li>Node.js物聯網裝置開發 &nbsp&nbsp 到期日：2018/07/20</li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color:#0396A6;">已到預約書目：</h2>
                    <li>平靜的心，專注的大腦 &nbsp&nbsp 截止日：2018/07/21</li>
                    
                  </ul>
                </li>
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color:#ffcc66;">推薦書目：</h2>
                    <li>日本市集巡禮 &nbsp 作者： タイムマシンラボ</li>
                    <li>二手時代 : 追求自由的烏托邦之路 &nbsp 作者：斯維拉娜‧亞歷塞維奇</li>
                    <li>單車失竊記 &nbsp 作者：吳明益</li>
                    <li>覺醒的你 &nbsp 作者： Michael A. Singer</li>
                    <li>你的第二人生始於你明白人生只有一次 &nbsp 作者： 拉斐爾‧喬丹奴</li>
                    <li>別讓現在的壞事，趕走未來的好事 &nbsp 作者： 艾爾文</li>
                  </ul>
                </li>     
              </ul>
            </div>
          </div>
      `);
  }

  function _ActivityMsg(){
    $('.carouselrow').html(`
          <div class="col-xs-12 col-sm-6" id="carouselrow">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="3" class="active"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="First slide" src="/images/c0427.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>歡迎成為暨大人!</h1>
                    <h4>107學年度大學個人申請入學招生於107年4月26日放榜。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Second slide" src="/images/c0523.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>中興新村風華再現共識論壇 </h1>
                    <h4>暨大邀集相關部會人員、里長、在地長輩、居民等，共同討論和激盪，為中興新村的可行之路，勾勒出具體可行的共識。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Third slide" src="/images/c0316.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>漫步春季 青春印「暨」</h1>
                    <h4>國立暨南國際大學春季健走活動於本月15日下午開跑。</h4>
                  </div>
                </div>
                <div class="carousel-item active">
                  <img class="img-responsive w-100" alt="Four slide" src="/images/c0227.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>暨大社會責任實踐深受肯定  全台唯一四案全數通過的一般大學</h1>
                    <h4>企盼藉由本次高教深耕計畫，積極建構大學社會責任的支持系統，培育出多元優質人才，提升國家整體競爭力!</h4>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="card" id="ActivityMsg">
              <div class="card-header">
                <h1 align="center">活動資訊</h1>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <ul class="imageStyle">
                    <li>2018虎門科技尤拉盃CAE創意大賽正式開跑</li>
                    <li>勞動部「尤努斯獎：第三屆社會創新與創業競賽 
                      <h3>即日起開始報名至107年9月20日</h3>
                    </li>
                    <li>國立交通大學將於Touch Taiwan舉辦I-Zone全國創新顯示暨照明專題競賽
                      <h3>展會期間(107年8月29-31日)</h3>
                    </li>
                    <li>國立屏東大學舉辦「2018我是接班人全國企業創新競賽
                      <h3>即日起至107年11月20日(星期二)止</h3>
                    </li>
                    <li>慈濟科技大學辦理「2018年東區科技教育觀摩-軟體創客競賽
                      <h3>活動即日起至107年07月14日</h3>
                    </li>
                    <li>經濟部工業局為推廣循環經濟概念舉辦「2018全國循環經濟創意競賽
                      <h3>即日起至107年7月23日</h3>
                    </li>
                    <h3 align="right">詳細內容請上暨大創業育成中心網站搜尋</h3>
                  </ul>
                </li>    
              </ul>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <ul class="imageStyle">
                    <li>2018/06/22 : 107年度 巨量資料分析師能力鑑定(初級)</li>
                    <li>2018/06/19 : 【2018儒鴻海外菁英儲備廠長】正式招募中!!</li>
                    <li>2018/06/15 : 【暑期實習】臺北市立聯合醫院【107學年度服務實習】</li>
                    <h3 align="right">詳細內容請上暨大資管系網站搜尋</h3>
                  </ul>
                </li>    
              </ul>
            </div>
          </div>
      `);
  }

  function _ClassMsg(){
    $('.carouselrow').html(`
          <div class="col-xs-12 col-sm-6" id="carouselrow">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="3" class="active"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="First slide" src="/images/c0427.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>歡迎成為暨大人!</h1>
                    <h4>107學年度大學個人申請入學招生於107年4月26日放榜。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Second slide" src="/images/c0523.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>中興新村風華再現共識論壇 </h1>
                    <h4>暨大邀集相關部會人員、里長、在地長輩、居民等，共同討論和激盪，為中興新村的可行之路，勾勒出具體可行的共識。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Third slide" src="/images/c0316.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>漫步春季 青春印「暨」</h1>
                    <h4>國立暨南國際大學春季健走活動於本月15日下午開跑。</h4>
                  </div>
                </div>
                <div class="carousel-item active">
                  <img class="img-responsive w-100" alt="Four slide" src="/images/c0227.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>暨大社會責任實踐深受肯定  全台唯一四案全數通過的一般大學</h1>
                    <h4>企盼藉由本次高教深耕計畫，積極建構大學社會責任的支持系統，培育出多元優質人才，提升國家整體競爭力!</h4>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="card" id="ClassMsg">
              <div class="card-header">
                <h1 align="center">課程訊息</h1>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color: red;">尚未繳交作業：</h2>
                    <li>網頁程式設計作業: Assignment 9: Session</li>
                    <li>專題討論心得作業: 6/14 關於群眾募資你一定要知道的五件事</li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color:#0396A6;">課程重要訊息通知：</h2>
                    <li>[6/21專題討論]演講題目:Personal Health Record &nbsp 時間:下午1:10 &nbsp 地點:管260</li>
                    <li>[6/30專題討論]課程通知 &nbsp 本週停課</li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <ul class="imageStyle">
                  <h2 style="color:#ffcc66;">其他課程：</h2>
                    <h3 style="color: #0396A6;">五月份的外語小教室開始報名</h3>
                        <li>
                          <h3>《英文》</h3>
                          <h3>週一 12:10 - 13:00</h3>
                          <h3>7/14 生活會話 - Daily-Life</h3>
                          <h3>7/28 生活會話 - Trips & Vacations</h3>
                        </li>
                        <li>
                          <h3>《日文》 - 初階</h3>
                          <h3>週二 12:10 - 13:00</h3>
                          <h3>7/1 自我介紹</h3>
                          <h3>7/78 旅遊日語 - 旅館篇</h3>
                        </li>
                  </ul>
                </li>     
              </ul>
            </div>
          </div>
      `);
  }

  function _LectureMsg(){
    $('.carouselrow').html(`
      <div class="row" id="LectureMsg">
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-1.jpg" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>主題：打造自媒任我行</li>
                <li>課程時間: 2018/5/26</li>
                <li>課程地點: R立方學堂</li>
                <h4>社區報辦報分享與新聞攝影工作坊<br>
                  ❤️人數限制: 30名 <br>
                  💙參與學員以對活動攝影有興趣者、有單眼相機者佳，數位相機其次，須自備相機。
                  若無相機可向校內各單位（如圖書館、本科系所）詢問是否可借出使用。若無相機可以手機代替。
                </h4>
              </ul>
            </h3>
          </div>
        </div>
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-2.jpg" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>主題：地方達人工作坊 2018初夏體驗</li>
                <li>時間：07/01(日) 09～17</li>
                <li>時間：07/08(日) 09～13</li>
                <li>課程地點: R立方學堂</li>
                <h4>        
                  #R立方返鄉創新實務學程<br>
                  地方達人工作坊 2018初夏體驗<br>
                  工作坊活動完全免費報名喔~<br>
                </h4>
              </ul>
            </h3>
          </div>
        </div>
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-3.jpg" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>主題：咖啡與烘焙:在地小館系列</li>
                <li>時間：06/21(四) 19～21</li>
                <li>課程地點: R立方學堂</li>
                <h4>禾恬民宿Cafe&Bar─流浪咖啡師的歸宿 林立昕<br>
                    經營禾田民宿的流浪咖啡師─林立昕，是一位只要身在吧檯，
                    便會吸引群眾目光的專精各項酒品與各國咖啡的吧檯手，在吧台上推廣在地的農特產品，
                    並結合自身飲品專業，讓來到埔里的訪客了解在地的生活面。
                </h4>
              </ul>
            </h3>
          </div>
        </div>
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-4.jpg" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>第十屆公共參與行動與自主學習微型獎勵方案</li>
                <li>時間:6月13日星期三</li>
                <li>地點:本校人文咖啡</li>
                <h4>微型提案 成果發表暨評選會</h4>
              </ul>
            </h3>
          </div>
        </div>
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-5.png" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>主題:埔里百工系列沙龍</li>
                <li>時間:2018/05/09 PM7:00-9:00</li>
                <li>地點:R立方學堂 * 永樂園青年旅館</li>
                <h4>第07彈－賣肉的人．陳聰閔<br>
                小地方、小人物、小故事、小念頭。匠、藝、工，在地事、在地人、在地文化、在地經驗。
                每月第二和第四個周二晚上七點，他們的故事。
                </h4>
              </ul>
            </h3>
          </div>
        </div>
        <div class="card col-2">
          <img class="card-img-top" src="./images/Lecture-6.png" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">
              <ul class="imageStyle">
                <li>主題:埔里百工系列沙龍</li>
                <li>時間:2018/04/17 PM7:00-9:00</li>
                <li>地點:R立方學堂</li>
                <h4>第05彈－風潮的人🧞‍♂️．謝顯林<br>
                小地方、小人物、小故事、小念頭。匠、藝、工，在地事、在地人、在地文化、在地經驗。
                每月第二和第四個周二晚上七點，他們的故事。
                </h4>
              </ul>
            </h3>
          </div>
        </div>
      </div>
      `);
  }

  function _NewsMsg(){
    $('.carouselrow').html(`
        <div class="col-xs-12 col-sm-6" id="carouselrow">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="3" class="active"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="First slide" src="/images/c0427.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>歡迎成為暨大人!</h1>
                    <h4>107學年度大學個人申請入學招生於107年4月26日放榜。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Second slide" src="/images/c0523.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>中興新村風華再現共識論壇 </h1>
                    <h4>暨大邀集相關部會人員、里長、在地長輩、居民等，共同討論和激盪，為中興新村的可行之路，勾勒出具體可行的共識。</h4>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="img-responsive w-100" alt="Third slide" src="/images/c0316.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>漫步春季 青春印「暨」</h1>
                    <h4>國立暨南國際大學春季健走活動於本月15日下午開跑。</h4>
                  </div>
                </div>
                <div class="carousel-item active">
                  <img class="img-responsive w-100" alt="Four slide" src="/images/c0227.jpg" data-holder-rendered="true">
                  <div class="carousel-caption d-none d-md-block">
                    <h1>暨大社會責任實踐深受肯定  全台唯一四案全數通過的一般大學</h1>
                    <h4>企盼藉由本次高教深耕計畫，積極建構大學社會責任的支持系統，培育出多元優質人才，提升國家整體競爭力!</h4>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <ul class="list-unstyled" id="news">
            ${_newsGet()}
          </ul>
        </div>
      `);
  }

	function _SchoolMap(){
		$('.carouselrow').html(`
			<img class="img-responsive" 
				 alt="..." 
				 src="/images/campus_map.jpg"
				 style="width: 100%;position: absolute;">`
		);
	}

	function _ExitAction(){
		var id = $('#username').attr("data-id");
		console.log(`/exit/${username}`);
		$.ajax({
			url: `/exit/${id}`, 
			type: 'patch', 
			dataType: 'json',
			contentType: 'application/json', 
			xhrFields: {
				withCredentials: true
			},
			success: function (data) {
				console.log(data);
				$('#username').html("歡迎光臨國立暨南國際大學");
        $('#footer').css("background-color", "#20CACB");
        $('#kkk').css("background-color", "#91C5E9");
        var img = document.getElementById('alertImg');
        var img2 = document.getElementById('alertImg2');
        img.style.visibility = "hidden";
        img2.style.visibility = "hidden";
			},
			error: function (jqXHR) {
				console.log(jqXHR);
			}
		})
	}

  function _newsGet(){
    $.ajax({
      url: '/news',
      type: 'get',
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {

        $('#news').html('');

        if($('#username').attr("data-isMember") == "true"){
          PersonNews = data.filter(function(el) {
              return el.IsNCNU !== "N";
          });
        }
        else
        {
          PersonNews = data.filter(function(el) {
              return el.IsNCNU !== "Y";
          });
        }
        
        console.log(PersonNews);
        var count = 0;
        for (let news of PersonNews) {
          if(count < 4){
            news.title = news.title || '';
          news.content = news.content || '';
          news.PostDate = news.PostDate || '';
          news.image = news.image || '';

          $('#news').prepend(`
            <li class="media my-1">
                      <img class="mr-3" src="${news.image}" alt="Generic placeholder image">
              <div class="media-body">
                <h1 class="mt-0 mb-1">${news.title}</h1>
                <h2>${news.content}</h2>
                <h4>${news.PostDate}</h4>
              </div>
                  </li>
          `)
          count += 1;

          }
          
        }
      },
      error: function (jqXHR, statusCode, c) {
        console.log(jqXHR);
        
      }
    });
  }

})();

