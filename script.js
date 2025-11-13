 //prgress circle
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        const offset = 157 - 157 * scrollPercent; // 157 = 2πr

        document.querySelector(".progress").style.strokeDashoffset = offset;
      });