import { ImageSlot } from "./ImageSlot";

/**
 * Final product storytelling section — two lifestyle images side-by-side,
 * touching, like Sept's split-screen hero. No text, the photography carries
 * the conversion message.
 */
export function LifestyleStory() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="flex w-full">
        <div className="flex-1 aspect-[3/4] bg-muted overflow-hidden">
          <ImageSlot
            label="lifestyle image — dahlia vanity case 1"
            className="h-full w-full"
            caption="lifestyle image 1"
          />
        </div>
        <div className="flex-1 aspect-[3/4] bg-muted overflow-hidden">
          <ImageSlot
            label="lifestyle image — dahlia vanity case 2"
            className="h-full w-full"
            caption="lifestyle image 2"
          />
        </div>
      </div>
    </section>
  );
}
