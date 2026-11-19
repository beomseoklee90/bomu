import { useState, useEffect, useRef } from "react";
import "./App.css";

/* 🛠️ 설정 1: 카테고리 및 파일 목록 관리 
  - files 배열에 public/data/폴더/ 안에 있는 파일명만 적으면 됨
*/
const categoryConfig = {
  // Japanese: {
  //   path: "Japanese",
  //   label: "전략 보고서 샘플",
  //   mobileLabel: "전략 보고서",
  //   files: ["report.txt"],
  // },
  AI: {
    path: "REPORT",
    label: "심리학",
    mobileLabel: "심리학",
    files: [
      "self_esteem.html",
      "smartphone_habit.html",
      "perfectionism_burnout.html",
    ],
  },
};

const categoryEntries = Object.entries(categoryConfig).map(([id, config]) => ({
  id,
  ...config,
}));

/* 🎵 설정 2: 배경음악 및 유튜브 홍보 
  - playlist: public/data/songs/ 폴더 안에 있는 mp3 파일명
*/
const musicConfig = {
  playlist: [
    "This Rhythm.mp3",
    "Dance.mp3",
    "最後かな.mp3",
    "잊을 수 없어.mp3",
    "이 그루브라면.mp3",
  ],
  youtubeLink: "https://www.youtube.com/@DJ_ICE_BREAKING",
};

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secretFile = params.get("secret");

    if (secretFile) {
      const targetUrl = `${import.meta.env.BASE_URL}data/Japanese/${secretFile}.html`;
      window.location.href = targetUrl;
    }
  }, []);

  const [currentCategory, setCurrentCategory] = useState(
    categoryEntries[0]?.id || "",
  );
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const activeCategory =
    categoryEntries.find((category) => category.id === currentCategory) ||
    categoryEntries[0];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadFiles = async () => {
      const config = activeCategory;

      if (!config || !config.files || config.files.length === 0) {
        setPosts([]);
        setSelectedPost(null);
        return;
      }

      setPosts([]);
      setSelectedPost(null);

      const loadedPosts = await Promise.all(
        config.files.map(async (filename) => {
          const lowerName = filename.toLowerCase();

          if (lowerName.endsWith(".pdf")) {
            return {
              id: filename,
              title: filename,
              content: "",
              type: "pdf",
              fileName: filename,
            };
          }

          try {
            const response = await fetch(
              `${import.meta.env.BASE_URL}data/${config.path}/${filename}`,
            );

            if (!response.ok) throw new Error("File not found");

            const text = await response.text();
            const splitIndex = text.indexOf("\n");
            const dateTitle =
              splitIndex !== -1
                ? text.substring(0, splitIndex).trim()
                : filename;
            const contentHtml =
              splitIndex !== -1 ? text.substring(splitIndex + 1) : text;

            return {
              id: filename,
              title: dateTitle,
              content: contentHtml,
              type: "text",
              fileName: filename,
            };
          } catch {
            return {
              id: filename,
              title: "Error",
              content: "File not found",
              type: "text",
              fileName: filename,
            };
          }
        }),
      );

      setPosts(loadedPosts);
      setSelectedPost(loadedPosts.length > 0 ? loadedPosts[0] : null);
    };

    loadFiles();
  }, [activeCategory]);

  const handleSongEnd = () => {
    const nextIndex = (currentSongIndex + 1) % musicConfig.playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePdfFullscreen = async () => {
    const pdfElement = document.querySelector(".pdf-viewer-shell");
    if (!pdfElement) return;

    try {
      if (!document.fullscreenElement) {
        if (pdfElement.requestFullscreen) {
          await pdfElement.requestFullscreen();
        }
        setIsPdfFullscreen(true);
        return;
      }

      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
      setIsPdfFullscreen(false);
    } catch (error) {
      console.log("전체화면 실행 실패:", error);
    }
  };

  const pdfViewerSrc =
    selectedPost?.type === "pdf"
      ? `${import.meta.env.BASE_URL}data/${activeCategory.path}/${selectedPost.fileName}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
      : "";

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPdfFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("자동 재생 막힘(사용자 클릭 필요):", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  if (!selectedPost && posts.length > 0 && posts[0].title !== "Error") {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <nav
        className={`sidebar ${isMobileMenuOpen ? "" : "mobile-menu-closed"}`}
      >
        <div className="brand-box">
          <div className="brand-icon">B</div>
          <div>
            <p className="brand-kicker">DIGITAL ARCHIVE</p>
            <h2>BOMU.PRO</h2>
          </div>
        </div>

        <div className="section-block">
          <div className="section-label">CATEGORY · 대분류</div>
          <div className="category-selector">
            {categoryEntries.map((category) => (
              <div
                key={category.id}
                className={`logo-item ${currentCategory === category.id ? "active" : ""}`}
                onClick={() => setCurrentCategory(category.id)}
              >
                <span className="desktop-text">{category.label}</span>
                <span className="mobile-text">{category.mobileLabel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sub-category-panel">
          <div className="sub-category-label">DOCUMENTS · 문서 목록</div>
          <ul className="menu-list">
            {posts.map((post) => (
              <li
                key={post.id}
                className={
                  selectedPost && selectedPost.id === post.id ? "active" : ""
                }
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "탭 영역 접기" : "탭 영역 열기"}
        >
          {isMobileMenuOpen ? "⌃ 목록 접기" : "⌄ 목록 펼치기"}
        </button>

        <div
          className={`music-player-box ${isPlaylistOpen ? "playlist-open" : ""}`}
        >
          <div className="music-header">
            <p className="music-title">♫ BGM LOUNGE</p>
            <button
              type="button"
              className="playlist-toggle"
              onClick={() => setIsPlaylistOpen((prev) => !prev)}
              aria-label={isPlaylistOpen ? "재생 목록 닫기" : "재생 목록 열기"}
            >
              {isPlaylistOpen ? "⏷" : "⏶"}
            </button>
          </div>

          <div className="current-track-box">
            <span className="track-pill">NOW</span>
            <span>{musicConfig.playlist[currentSongIndex]}</span>
          </div>

          <audio
            ref={audioRef}
            src={`${import.meta.env.BASE_URL}data/songs/${musicConfig.playlist[currentSongIndex]}`}
            onEnded={handleSongEnd}
          />

          {isPlaylistOpen && (
            <div className="playlist-panel">
              <ul className="playlist-list">
                {musicConfig.playlist.map((song, index) => (
                  <li
                    key={song}
                    className={index === currentSongIndex ? "active" : ""}
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setIsPlaying(true);
                      setIsPlaylistOpen(false);
                    }}
                  >
                    <span className="playlist-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="playlist-name">{song}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="music-controls">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <button onClick={handleSongEnd}>⏭ Next</button>
          </div>
        </div>
      </nav>

      <main className="main-viewer">
        {selectedPost?.type === "pdf" && (
          <div className="presentation-controls">
            <a
              className="floating-action download-action"
              href={`${import.meta.env.BASE_URL}data/${activeCategory.path}/${selectedPost.fileName}`}
              download={selectedPost.fileName}
              aria-label="파일 다운로드"
              title="PDF 다운로드"
            >
              ⬇
            </a>

            <button
              type="button"
              className="floating-action fullscreen-action"
              onClick={handlePdfFullscreen}
            >
              {isPdfFullscreen ? "⤢ 원래 크기" : "⤢ 전체 화면"}
            </button>
          </div>
        )}

        <div className="paper">
          {selectedPost ? (
            <>
              <h1 className="paper-title">{selectedPost.title}</h1>
              {selectedPost.type === "pdf" ? (
                <div
                  className={`pdf-viewer-shell ${isPdfFullscreen ? "fullscreen" : ""}`}
                >
                  <iframe
                    title={selectedPost.title}
                    src={pdfViewerSrc}
                    className="pdf-viewer"
                    allow="fullscreen"
                  />
                </div>
              ) : (
                <div
                  className="paper-content"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>등록된 문서가 없습니다.</p>
              <p>No documents available yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
