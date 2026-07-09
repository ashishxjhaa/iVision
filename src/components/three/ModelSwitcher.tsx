import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const smallMacbookref = useRef();
  const largeMacbookref = useRef();

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookref.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookref.current, 0);

      fadeMeshes(smallMacbookref.current, 0);
      fadeMeshes(largeMacbookref.current, 1);
    } else {
      moveGroup(smallMacbookref.current, 0);
      moveGroup(largeMacbookref.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookref.current, 1);
      fadeMeshes(largeMacbookref.current, 0);
    }
  }, [scale]);

  const controlConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    cofig: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookref}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlConfig}>
        <group ref={smallMacbookref}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
