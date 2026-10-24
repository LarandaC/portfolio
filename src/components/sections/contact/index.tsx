import { NIGHT } from "@/lib/media";
import { SquareField } from "@/components/shared/SquareField";
import { Petals } from "@/components/shared/Petals";
import { ContactCard } from "./components/ContactCard";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="force-light relative h-[110vh] min-h-[760px] overflow-hidden bg-surface max-tablet:h-auto max-tablet:min-h-0 max-tablet:pt-[60px]"
    >
      <SquareField count={16} />

      <div className="absolute inset-x-0 bottom-0 h-[78%] [mask-image:linear-gradient(to_bottom,transparent_0,#000_24%)] max-tablet:relative max-tablet:h-[92vh] max-tablet:min-h-[640px]">
        <img
          id="ctaImg"
          className="h-[118%] w-full object-cover object-[center_60%] max-tablet:object-[30%_60%]"
          src={NIGHT}
          alt="Moonlit cherry blossom valley"
        />
      </div>

      <Petals />
      <ContactCard />
    </section>
  );
}

export default ContactSection;
