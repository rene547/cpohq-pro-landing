"use client";

import { useState } from "react";
import type { Variant } from "@/lib/variants";
import Banner from "@/components/sections/Banner";
import Hero from "@/components/sections/Hero";
import HeroV0 from "@/components/sections/HeroV0";
import LogoBar from "@/components/sections/LogoBar";
import Highlights from "@/components/sections/Highlights";
import LoveWall from "@/components/sections/LoveWall";
import Community from "@/components/sections/Community";
import ChiefOfStaff from "@/components/sections/ChiefOfStaff";
import Agents from "@/components/sections/Agents";
import Security from "@/components/sections/Security";
import TalkToUs from "@/components/sections/TalkToUs";
import Footer from "@/components/sections/Footer";
import JoinModal from "@/components/JoinModal";
import VariantSwitcher from "@/components/VariantSwitcher";

export default function Landing({ variant }: { variant: Variant }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openJoin = (prefill = "") => {
    setEmail(prefill);
    setModalOpen(true);
  };

  return (
    <div className={`page ${variant.themeClass} flex-1`}>
      {/* v0 follows Stripe: nav is topmost; investor banner returns lower once
          Lucas's logos land */}
      {variant.id === "v0" ? (
        <HeroV0 onJoin={openJoin} />
      ) : (
        <>
          <Banner />
          <Hero variant={variant} onJoin={openJoin} />
        </>
      )}
      <LogoBar variant={variant} />
      <Highlights />
      <LoveWall />
      <Community />
      <ChiefOfStaff variant={variant} />
      <Agents />
      <Security />
      <TalkToUs onJoin={() => openJoin()} />
      <Footer />
      <JoinModal open={modalOpen} email={email} onClose={() => setModalOpen(false)} />
      <VariantSwitcher current={variant.id} />
    </div>
  );
}
