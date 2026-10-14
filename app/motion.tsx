"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const setupReveal = () => {
      const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
      );

      reveal.forEach((el) => {
        el.classList.remove("is-visible");
        observer?.observe(el);
      });

      // Garante que o conteúdo acima da dobra apareça mesmo após navegação client-side.
      requestAnimationFrame(() => {
        reveal.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.93 && rect.bottom > 0) {
            el.classList.add("is-visible");
            observer?.unobserve(el);
          }
        });
      });
    };

    // Aguarda o Next montar a nova rota antes de procurar os elementos animados.
    frame = requestAnimationFrame(setupReveal);

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };

    const onScroll = () => {
      const p = Math.min(
        1,
        window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      );
      document.documentElement.style.setProperty("--scroll", p.toFixed(4));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
