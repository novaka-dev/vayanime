/**
 * HeroTitle component displaying the main heading with styled text
 */
export const HeroTitle = () => {
  return (
    <div className="relative">
      <h1 className="inline-block max-w-6xl leading-none font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <div className="relative mb-3 pb-2 text-center text-4xl sm:text-5xl md:mb-5 md:text-6xl">
          <span className="inline-block">STREAM ANIME</span>
        </div>
        <div className="mt-1 block text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-primary text-primary-foreground relative inline-block px-4 py-1">
            ANYTIME
          </span>
          <span className="text-foreground ml-2 inline-block uppercase">
            ANYWHERE
          </span>
        </div>
      </h1>
    </div>
  );
};
