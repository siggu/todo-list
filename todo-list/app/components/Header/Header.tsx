import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <Link href={'/'}>
      <header className={`${styles.header}`}>
        {/* Small Screen */}
        <div className={styles.smallScreen}>
          <Image src='/svgs/img/small.svg' alt='Small Header' width={50} height={50} />
        </div>
        {/* Medium Screen */}
        <div className={styles.mediumScreen}>
          <Image src='/svgs/img/large.svg' alt='Medium Header' width={105} height={50} />
        </div>
        {/* Large Screen */}
        <div className={styles.largeScreen}>
          <Image src='/svgs/img/large.svg' alt='Large Header' width={105} height={50} />
        </div>
      </header>
    </Link>
  );
};

export default Header;
