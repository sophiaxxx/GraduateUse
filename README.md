GraduateUse
===

# **伺服器端（web）**

**1.環境架設**
    
    1-1. 安裝node.js
    1-2. 安裝本研究使用到的相關模組

    $npm install 
    * express
    * fs
    * http
    * path
    * cors
    * moment
    * consolidate
    * socket.io
    * body-parser
    * os

	
1.3 在terminal執行指令 
```
＄node app.js
```
1.4 執行成功可以在瀏覽器網址列輸入 
> http://127.0.0.1:3000

**2.確保伺服器與手機使用相同wifi，方能執行推播**


# **應用程式端(app)**

**1.環境架設**

    1-1.採用android studio開發
    1-2.專案使用到estimate 的Beacon 與 facebook api

**2.java檔案與所屬UI layout描述**

    (a)MainActivity.java / layout --> activity_main.xml
       執行beacon監控的部分。
       
    (b)FaceBActivity.java / layout --> activity_face_b.xml
       執行fb登入與取得使用者資訊，處理資料與執行multicast（UDP Socket）。



