import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logotipo.png"
        alt="Módica Inmobiliaria"
        width={180}
        height={56}
        style={{ width: 'auto', height: '44px', borderRadius: '6px' }}
        quality={95}
        priority
      />
    </Link>
  );
};

export default Logo;
