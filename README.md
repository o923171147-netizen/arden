# 永續物流與綠色科技專題報告儀表板

本專案是一個遵循 **UI/UX Pro Max 高級設計規範** 的響應式深色模式專題報告網頁。透過直觀的儀表板配置，整合了影片介紹、投影片線上簡報器、關鍵綠色物流數據趨勢圖表，並支援多種相關附件檔案的線上預覽與下載。

## 專案功能特點

1. **極簡專業深色模式 (Premium Minimalist Dark Mode)**：
   - 採用優雅的深色背景配上高質感磨砂玻璃 (Glassmorphism) 卡片設計。
   - 主色調選用代表環保永續的翡翠綠 (`#10b981`)，搭配具備科技感的青色 (`#06b6d4`)，建立和諧的視覺對比。
   
2. **側邊欄導航系統 (Sidebar Navigation)**：
   - 桌上型電腦端使用固定式左側選單，支援滑鼠懸停和點擊時的動態高亮狀態。
   - 行動裝置端自動轉化為響應式抽屜式側邊欄 (Mobile Drawer)，點擊漢堡按鈕呼叫並帶有背景模糊遮罩。

3. **線上投影片簡報器 (Interactive Slide Presentation Viewer)**：
   - 完整抽取並載入 28 頁投影片（包括 PNG 與 JPEG 格式），並設置上一頁、下一頁按鈕與進度條指示。
   - 支援鍵盤左右方向鍵（`ArrowLeft` / `ArrowRight`）以及空白鍵翻頁。
   - 配備預加載 (Preload) 機制，確保使用者在瀏覽相鄰頁面時完全無延遲卡頓。

4. **動態數據趨勢圖表 (Data Visualizations)**：
   - 整合 Chart.js，以精緻的深色圖表主題呈現「綠色物流市場產值趨勢」（折線圖）與「減碳關鍵技術貢獻佔比」（甜甜圈圖）。
   - 折線圖包含平滑曲線與動態悬停提示框 (Custom Tooltips)。

5. **精選影音與下載中心 (Video & Downloads)**：
   - 網頁內嵌 3 個精選 YouTube 綠色物流教學視評與科技影片。
   - 一鍵預覽或下載 `永續物流與綠色技術.pptx.pdf` 及 `永續物流與綠色科技.pptx` (61.8 MB) 原始附件。

## 目錄結構說明

```text
C:\Users\user\.gemini\arden\
├── index.html                   # 專案主網頁 (HTML 結構與 SEO 優化)
├── styles.css                   # 全局樣式設定 (Glassmorphism 樣式與響應式排版)
├── app.js                       # 主程式邏輯 (導航、Slide 翻頁、Chart.js 控制)
├── README.md                    # 本說明文件
├── 永續物流與綠色科技.pptx      # 簡報 PowerPoint 原始檔案
├── 永續物流與綠色技術.pptx.pdf  # 簡報 PDF 檔案
└── slides_images/               # 線上投影片播放器所使用的 28 頁投影片圖檔
    ├── slide1.png
    ├── ...
    ├── slide11.jpeg             # (特殊格式 JPEG)
    └── ...
```

## 開發與執行方式

本網頁為純前端項目，不依賴任何伺服器端環境。

1. **本地預覽**：直接在瀏覽器中雙擊打開 `index.html` 檔案即可。
2. **網頁伺服器啟動 (推薦)**：
   使用 Python 啟動一個簡易伺服器，可在瀏覽器中順暢加載全部資源：
   ```bash
   # 在專案目錄下執行
   python -m http.server 8000
   ```
   接著在瀏覽器打開 [http://localhost:8000](http://localhost:8000) 即可完整體驗。
