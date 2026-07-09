"use client";

import { useState } from "react";
import type { Variant } from "@/lib/variants";
import Image from "next/image";
import { ShellNavbar } from "@/components/ShellNavbar";
import HeroV0 from "@/components/sections/HeroV0";
import LogoBarV0 from "@/components/sections/LogoBarV0";
import HighlightCardsV0 from "@/components/sections/HighlightCardsV0";
import LoveWallV0 from "@/components/sections/LoveWallV0";
import CommunityV0 from "@/components/sections/CommunityV0";
import ChiefOfStaffV0 from "@/components/sections/ChiefOfStaffV0";
import TalkToUsV0 from "@/components/sections/TalkToUsV0";
import HeroV1 from "@/components/sections/HeroV1";
import LogoBarV1 from "@/components/sections/LogoBarV1";
import HighlightCardsV1 from "@/components/sections/HighlightCardsV1";
import LoveWallV1 from "@/components/sections/LoveWallV1";
import CommunityV1 from "@/components/sections/CommunityV1";
import ChiefOfStaffV1 from "@/components/sections/ChiefOfStaffV1";
import TalkToUsV1 from "@/components/sections/TalkToUsV1";
import Agents from "@/components/sections/Agents";
import AgentsV1 from "@/components/sections/AgentsV1";
import Security from "@/components/sections/Security";
import Footer from "@/components/sections/Footer";
import JoinModal from "@/components/JoinModal";
import TopBarV1 from "@/components/TopBarV1";
import VariantSwitcher from "@/components/VariantSwitcher";

/* v0 is the approved, frozen baseline. v1 is a full fork (own section
   components + own content file) where all client feedback lands, so v0
   stays byte-identical while v1 evolves. Agents/Security/Footer and the
   small shared primitives are still common -- fork them into V1 copies the
   first time they need to diverge. */

const NAV_LINKS = [
  { label: "Community", href: "#community" },
  { label: "AI Chief of Staff", href: "#chief-of-staff" },
  { label: "AI Agents", href: "#agents" },
  { label: "Careers", href: "#" },
];

export default function Landing({ variant }: { variant: Variant }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openJoin = (prefill = "") => {
    setEmail(prefill);
    setModalOpen(true);
  };

  const v1 = variant.id === "v1";

  /* v1 wraps the navbar in a sticky stack with the investor top bar; the
     navbar goes static inside it (the wrapper owns the stickiness). v0
     renders the navbar exactly as before. */
  const navbar = (
    <ShellNavbar
      className={v1 ? "static" : undefined}
      logo={
        <Image
          src="/brand/cpohqlogo-horizontal-black.png"
          alt="CPOHQ"
          width={120}
          height={24}
          priority
        />
      }
      links={NAV_LINKS}
      secondaryCta={{ label: "Talk to us", href: "#" }}
      cta={{ label: "Join CPOHQ", onClick: () => openJoin() }}
    />
  );

  return (
    <div className={`page ${variant.themeClass} flex-1`}>
      {v1 ? (
        <div className="sticky top-0 z-50">
          <TopBarV1 />
          {navbar}
        </div>
      ) : (
        navbar
      )}
      {v1 ? <HeroV1 onJoin={openJoin} /> : <HeroV0 onJoin={openJoin} />}
      {v1 ? <LogoBarV1 /> : <LogoBarV0 />}
      {v1 ? <HighlightCardsV1 /> : <HighlightCardsV0 />}
      {v1 ? <LoveWallV1 /> : <LoveWallV0 />}
      {v1 ? <CommunityV1 /> : <CommunityV0 />}
      {v1 ? <ChiefOfStaffV1 /> : <ChiefOfStaffV0 />}
      {v1 ? <AgentsV1 /> : <Agents />}
      <Security />
      {v1 ? (
        <TalkToUsV1 onJoin={() => openJoin()} />
      ) : (
        <TalkToUsV0 onJoin={() => openJoin()} />
      )}
      <Footer />
      <JoinModal open={modalOpen} email={email} onClose={() => setModalOpen(false)} />
      <VariantSwitcher current={variant.id} />
    </div>
  );
}
