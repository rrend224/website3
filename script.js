document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニューの動作
  const hamburger = document.querySelector(".hamburger-menu")
  const mobileNav = document.querySelector(".mobile-nav")
  const body = document.body

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileNav.classList.toggle("active")
    body.classList.toggle("no-scroll")
  })

  // モバイルナビゲーションのリンクをクリックしたときにメニューを閉じる
  const mobileLinks = document.querySelectorAll(".mobile-nav a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      mobileNav.classList.remove("active")
      body.classList.remove("no-scroll")
    })
  })

  // ヘッダースクロールエフェクト
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 100) {
      header.style.padding = "5px 0"
    } else {
      header.style.padding = "10px 0"
    }
  })

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // 要素が画面内に入ったときのアニメーション
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".service-item, .news-item, .type-item")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        element.classList.add("animate")
      }
    })
  }

  // アニメーション用のCSSを追加
  const style = document.createElement("style")
  style.innerHTML = `
    .service-item, .news-item, .type-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-item.animate, .news-item.animate, .type-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    body.no-scroll {
      overflow: hidden;
    }
  `
  document.head.appendChild(style)

  // 読み込み時とスクロール時にアニメーションをチェック
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)

  // リサイズ時のハンバーガーメニュー状態管理
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
      hamburger.classList.remove("active")
      mobileNav.classList.remove("active")
      body.classList.remove("no-scroll")
    }
  })
})
