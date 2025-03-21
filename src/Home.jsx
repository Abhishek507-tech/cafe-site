/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AnimatedBackground from "./components/AnimatedBackground";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Link } from "react-router-dom";

function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="w-[100vw] max-md:h-[120vh] mt-44 max-md:mt-24 max-lg:px-10 px-40">
      <div className="flex max-md:flex-row gap-10 max-md:grid-cols-1 items-center justify-center w-full">
        <div className="max-w-screen-sm text-left">
          <h1 className="font-bold text-8xl max-md:text-6xl mb-2 text-darkGreenAccent ">
            {" "}
            Sip & Play{" "}
          </h1>
          <h2 className="font-bold text-3xl mb-4 text-orangeLight">
            {" "}
            Boardgame Cafe
          </h2>
          <p className="font-sans mb-6 text-lg">
            Join us with your friends and family to explore our extensive
            collection of over 500 board games! For just $10 per person, enjoy 3
            hours of gameplay (Friday-Sunday and Holidays: $12 per person).
          </p>

          <button className="bg-orangeLight px-6 lg:px-8 py-3 lg:py-4 rounded-full mt-6 hover:bg-[#F7E7DC] relative z-10">
            <Link to="/about">Learn More</Link>
          </button>
        </div>
        <div className="h-[30vw] aspect-square max-lg:hidden shadow-2xl rounded-full bg-orangeLight flex  items-center justify-center">
          <Canvas
            camera={{
              position: [2, 10, 12],
              fov: 75,
              rotation: [-Math.PI / 4, 0, 0],
            }}
            size={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[3, 3, 3]} intensity={5} />
            <Model cursor={cursor} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>

      {/* <div className="my-16 lg:my-32 text-2xl lg:text-4xl">
        <h3 className="text-center font-bold mb-12 lg:mb-24">
          Brewing Happiness, One Cup at a Time
        </h3>
        <div className="flex flex-wrap justify-evenly">
          <div className="flex flex-col items-center mb-6">
            <div className="menuIcon">
              <img src="/coffeeCup.png" alt="Coffee" />
            </div>
            <p className="menuItemsText"> coffee </p>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="menuIcon">
              <img src="/bobaCup.png" alt="Boba" />
            </div>
            <p className="menuItemsText"> boba </p>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="menuIcon">
              <img src="/fries.png" alt="Hot Bites" />
            </div>
            <p className="menuItemsText"> hot bites </p>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="menuIcon">
              <img src="/sandwich.png" alt="Sandwiches" />
            </div>
            <p className="menuItemsText"> sandwiches </p>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="menuIcon">
              <img src="/beerCup.png" className="w-[5/6]" alt="Beer/Wine" />
            </div>
            <p className="menuItemsText"> beer/wine </p>
          </div>
        </div>
      </div> */}
      <AnimatedBackground />
    </section>
  );
}

//{ cursor }

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./desserts/scene.gltf");
  const modelRef = useRef();
  useFrame(() => {
    // Rotate the model in the z-direction
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Adjust rotation speed as needed
    }
  });
  return <primitive object={gltf.scene} scale={[4, 4, 4]} ref={modelRef} />;
};

Model.propTypes = {
  cursor: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Home;
