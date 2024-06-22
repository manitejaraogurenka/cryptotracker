import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import TrackingImg1 from "../../assets/Tracking.png";
import Carousel from "../../components/banner/carousel";

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 860);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cryptoImages = [
    {
      src: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
      className: "absolute w-[60px] top-24 left-3",
      alt: "Ethereum Logo",
    },
    {
      src: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=032",
      className: "absolute w-[60px] top-8 left-16",
      alt: "BNB Logo",
    },
    {
      src: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=032",
      className: "absolute w-[60px] top-3 left-36",
      alt: "Shiba Inu Logo",
    },
    {
      src: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
      className: "absolute w-[60px] top-12 left-56",
      alt: "Tether Logo",
    },
    {
      src: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=032",
      className: "absolute w-[60px] top-32 left-60",
      alt: "Dogecoin Logo",
    },
  ];

  return (
    <div className="w-screen h-screen background-1 overflow-x-hidden select-none">
      <div className="flex h-[70%] text-white justify-around items-center w-screen">
        <div className={`ml-8 h-1/3 ${isSmallScreen ? "w-[50%]" : "w-[80%]"}`}>
          <h1
            data-aos="fade-in"
            data-aos-delay="0"
            className="text-6xl font-Orbitron mb-2 specialFont font-extrabold"
          >
            CRYPTO TRACKER
          </h1>
          <p
            className=" font-Oxanium font-semibold mb-4"
            data-aos="fade-in"
            data-aos-delay="0"
          >
            Stay Ahead in the World of Digital Currencies
          </p>
          <TypeAnimation
            splitter={(str) => str.split(/(?=\n| )/)}
            sequence={[
              "Your ultimate destination for real-time cryptocurrency insights. Stay informed about the ever-changing world of cryptocurrencies with the latest market trends, values, and performance of your favorite digital currencies.",
              3000,
            ]}
            speed={{ type: "keyStrokeDelayInMs", value: 40 }}
            omitDeletionAnimation={true}
            style={{
              fontSize: "1em",
              display: "block",
              minHeight: "200px",
              whiteSpace: "pre-wrap",
              textAlign: "justify",
            }}
            repeat={0}
          />
        </div>

        {isSmallScreen && (
          <div className="relative animate-move">
            <img
              src={TrackingImg1}
              className="w-80 pb-4 relative z-0"
              alt="Tracking"
              data-aos="fade-in"
              data-aos-once="true"
              style={{
                WebkitFilter:
                  "drop-shadow(10px 10px 18px rgba(0, 0, 255, 0.5)) drop-shadow(18px 18px 18px rgba(128, 0, 128, 0.5))",
                filter:
                  "drop-shadow(10px 10px 18px rgba(0, 0, 255, 0.5)) drop-shadow(18px 18px 18px rgba(128, 0, 128, 0.5))",
              }}
            />
            {cryptoImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                className={image.className}
                alt={image.alt}
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-delay={`${index * 400}`}
                style={{
                  WebkitFilter:
                    "drop-shadow(5px 5px 5px rgba(0, 0, 255, 0.5)) drop-shadow(18px 18px 18px rgba(128, 0, 128, 0.5))",
                  filter:
                    "drop-shadow(5px 5px 5px rgba(0, 0, 255, 0.5)) drop-shadow(18px 18px 18px rgba(128, 0, 128, 0.5))",
                }}
              />
            ))}
          </div>
        )}

        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/655ed96514f0e_1.png?d=1370x863"
          draggable={false}
          className={`${
            isSmallScreen ? "object-fill" : "object-cover"
          } w-screen h-screen absolute -z-0`}
          alt="Background"
          style={{ transform: "rotateY(180deg)", opacity: 0.3 }}
          data-aos="fade-in"
          data-aos-once="true"
        />
      </div>

      <div data-aos="fade-in" data-aos-once="true" data-aos-delay="1500">
        <div className="w-screen justify-center items-center flex mt-3 mb-2">
          <span className="text-[1.5rem] font-bold text-black bg-white rounded-lg text-shine">
            TRENDING CRYPTO
          </span>
        </div>
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
