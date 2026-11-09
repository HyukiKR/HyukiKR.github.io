# 개발 노트 사이트

GitHub Pages로 무료로 올리는 Jekyll 블로그입니다. 컴퓨터에 아무것도 설치하지 않아도, 마크다운 파일만 올리면 GitHub가 사이트를 만들어 줍니다.

## 1. 올리기 전에: 내 정보 넣기

`_config.yml` 맨 위를 고칩니다.

- `title` — 사이트 이름 (내 이름이나 닉네임)
- `author.name`, `author.bio` — 이름과 사이드바 한 줄 소개
- `author.avatar` — 이름 옆 아이콘 그림 (`assets/images/avatar.png`)
- `author.github` — GitHub 아이디
- `intro` — 홈 맨 위 소개 글 (마크다운)
- `url` — `https://내아이디.github.io`

`about.md`는 소개 페이지입니다.

## 2. GitHub에 올려서 공개하기

1. [github.com](https://github.com)에 가입하고 로그인합니다.
2. 오른쪽 위 **+** → **New repository**
   - Repository name: **`내아이디.github.io`** (아이디와 정확히 같게)
   - **Public** 선택 → **Create repository**
3. 새 저장소 화면에서 **uploading an existing file** 링크를 누릅니다.
4. 압축을 푼 폴더 **안의 내용물 전부**를 끌어다 놓습니다. (폴더 자체가 아니라 그 안의 파일·폴더들)
   → 아래 **Commit changes**
5. 저장소 **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)** → **Save**
6. 1~2분 기다린 뒤 `https://내아이디.github.io`에 접속하면 끝입니다.
   진행 상황은 저장소의 **Actions** 탭에서 보이고, 초록 체크가 뜨면 완료입니다.

> 저장소 이름을 `devlog`처럼 다르게 지었다면 주소는 `https://내아이디.github.io/devlog`가 되고, `_config.yml`의 `baseurl`을 `"/devlog"`로 바꿔야 디자인이 제대로 나옵니다.

## 3. 글 쓰기

`templates` 폴더에 개발일지·공부·게임 템플릿이 있습니다. (사이트에는 안 보이는 폴더예요)

**GitHub 웹에서 바로 쓰기**

1. 저장소 화면에서 **Add file → Create new file**
2. 파일 이름 칸에 `_posts/2026-11-15-first-boss.md`처럼 입력합니다.
   - 반드시 `_posts/날짜-영문제목.md` 형식
3. 템플릿 내용을 붙여넣고 고쳐 쓴 뒤 **Commit changes**
4. 1~2분 뒤 사이트에 반영됩니다.

**글 머리말 정리**

| 머리말 | 의미 |
|---|---|
| `categories: devlog` | 개발일지 |
| `categories: study` | 공부 |
| `project: my-game` | 어느 게임의 개발일지인지 (게임 파일의 `key`) |
| `tags: [C#, Unity]` | 주제. 첫 번째 태그가 공부 카테고리가 됨 |
| `summary:` | 홈에 보이는 요약 |
| `image:` | 홈 목록에 보일 대표 이미지·GIF (선택) |
| `build: v0.4` | 빌드 버전 (선택) |

왼쪽 사이드바의 카테고리는 머리말을 보고 자동으로 만들어집니다.

### 이미지 넣기

1. 저장소에서 `assets/images` 폴더로 들어가 **Add file → Upload files**로 올립니다.
2. 글에서 이렇게 씁니다.

```markdown
![설명]({{ '/assets/images/boss-01.png' | relative_url }})
```

GIF도 똑같습니다.

## 3-1. 글쓰기 화면(/admin)으로 쓰기

`https://HyukiKR.github.io/admin`에서 GitHub에 들어가지 않고 글을 쓸 수 있습니다.

**처음 한 번: 토큰 만들기**
1. GitHub → 오른쪽 위 프로필 → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
2. Repository access: **Only select repositories** → `HyukiKR.github.io`
3. Permissions → Repository permissions → **Contents: Read and write**
4. **Generate token** 후 나온 토큰을 복사 (다시 볼 수 없으니 안전한 곳에 보관)

**글쓰기**
1. `/admin` 접속 → **Sign In with Token** → 토큰 붙여넣기
2. 왼쪽에서 개발일지/공부/게임을 고르고 **New**
3. 다 쓰면 **Save** → 1~2분 뒤 사이트에 반영

토큰은 이 브라우저에만 저장됩니다. 공용 컴퓨터에서는 쓰고 나서 로그아웃하세요. 설정은 `admin/config.yml`에 있습니다.

## 4. 게임 추가하기

`templates/game-template.md` 내용을 복사해 `_projects/게임이름.md`로 새 파일을 만듭니다. `key`에 적은 값을 개발일지의 `project:`에 쓰면 그 게임 페이지에 기록이 모입니다.

## 5. (선택) 내 컴퓨터에서 미리 보기

[Ruby](https://www.ruby-lang.org/ko/downloads/)를 설치한 뒤:

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000`에서 볼 수 있습니다.

## 폴더 구조

```
_config.yml          사이트 설정
_posts/              개발일지·공부 글
_projects/           게임 소개 페이지
templates/           글·게임 템플릿 (사이트에는 안 올라감)
assets/images/       아이콘, 스크린샷
assets/css/main.css  디자인 (맨 위 색 값만 바꿔도 됨)
_layouts/, _includes/  페이지 뼈대
```
