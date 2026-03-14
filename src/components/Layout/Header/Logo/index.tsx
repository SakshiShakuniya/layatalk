import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/layatalklogo.webp"
        alt="logo"
        width={40}
        height={40}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
