import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { About, Cooking, Desk, Footer, Toolkit, Work } from "@/components/sections";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SoundLayer } from "@/components/sound";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <SoundLayer />
      <Cursor />
      <Nav />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>
      <main id="top">
        <Hero />
        <Cooking />
        <Work />
        <Desk />
        <Toolkit />
        <About />
      </main>
      <Footer />
    </>
  );
}
