import Image from "next/image";
const NierAutoImage = () => {
  return (
    <div>
      <Image
        src="/images/nierauto.jpg"         
        alt="Your custom banner background"
        fill
        className="object-cover brightness-[0.6] contrast-[1.15] saturate-[1.1]"
        priority                          
        quality={90}
      />
    </div>
  );
};

export default NierAutoImage ;