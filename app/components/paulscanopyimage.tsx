import Image from "next/image";
const PaulsCanopyImage = () => {
  return (
    <div>
      <Image
        className ="rounded-2xl shadow-lg border-white-500"
        src="/images/paulscanopy.png"         
        alt="cute photo of paul pocket monkey"  
        width= {500}                    
        height= {500}
        quality={90}
      />
    </div>
  );
};

export default PaulsCanopyImage ;