# 画像の変更方法ガイド（直感版）

このサイトの画像を変更するには、**「フォルダに画像を入れて、名前を変えるだけ」**で完了します。

## 1. メイン画像（トップの大きな画像）
1.  `images/main/` フォルダを開きます。
2.  ご自身の画像を入れ、名前を **`hero.png`** に変更してください。

---

## 2. 各作品のフォルダ管理
作品ごとにフォルダが分かれています。

### 例：作品1（Project One）の場合
`images/projects/project-1/` フォルダを開き、以下の名前で画像を保存してください。

-   **`thumb.jpg`** : 一覧画面に表示される表紙（サムネイル）
-   **`01.jpg`** : 詳細ページに表示される1枚目
-   **`02.jpg`** : 詳細ページに表示される2枚目
### Folder Architecture for Projects

Your projects are stored in `images/projects/`. Each folder **must** follow the `YYYY_ProjectName` naming convention:

```text
images/
└── projects/
    ├── 2025_異質な場所/
    ├── 2025_村上ディステンス/
    ├── 2024_隠された身体/
    ├── 2024_漂着するすね/
    ├── 2024_隠された身体(旧市場)/
    ├── 2024_成長する壁(haziの円卓)/
    ├── 2023_NewSign/
    ├── 2023_90本のコーラ/
    ├── 2023_成長する壁/
    ├── 2023_拘束する／保護する/
    └── 2022_鉄と塩/
```

### Contents of Project Folders

Inside each project folder (e.g., `2023_NewSign/`), you need these specific files:

| `thumb.jpg` | Main thumbnail shown on the homepage and WORKS list. |
| `01.jpg` | First image displayed in the project detail page. |
| `02.jpg` | Second image... (up to `30.jpg`) |
| `video.mp4`, `video.mov` | Project video (optional). Appears at the beginning. |
| `video01.mp4`, `video01.mov`| Supporting multiple videos (optional, up to 05). |

---

## 🎨 フォルダ構成のイメージ
```text
gupon_portfolio/
  └── images/
      ├── main/
      │   └── hero.png (メイン写真)
      └── projects/
          ├── project-1/
          │   ├── thumb.jpg (表紙)
          │   ├── 01.jpg
          │   └── ...
          └── project-2/
              ├── thumb.jpg
              └── ...
```

> [!TIP]
> **ヒント**
> ファイル形式は `.jpg` を推奨しますが、`.png` や `.webp` を使う場合はHTML内の `src="..."` の拡張子も書き換えてください。

## 3. 動画の追加方法
動画を表示するには、以下の2つの方法があります：

- **ローカルファイル**: 作品フォルダ内に `video.mp4` / `video.mov` または `video01.mp4` / `video01.mov` ... を配置してください。
- **YouTube埋め込み**: 詳細ページのURLの末尾に `&v=YouTubeの動画ID1,ID2` のように、カンマ区切りでIDを追加します。
  例: `work-detail.html?p=folder&t=title&v=ID_A,ID_B`
