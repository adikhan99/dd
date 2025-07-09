//@ts-nocheck
import React from 'react';
import { useRouter } from 'next/router';
import packageJson from '../../package.json'
import { SUPPORT_EMAIL } from '@utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/';
  const isPrivacyPolicyPage = router.pathname === '/privacy-policy';
  const releaseNumber = `${packageJson.releaseDate}.${packageJson.version}`;

  if (isPrivacyPolicyPage) {
    return null;
  }

  return (
    <footer
      className={`${styles.footer} ${isLoginPage ? styles.footerLogin : ''}`}
      style={{
        width: isLoginPage ? 'calc(100% - 380px)' : 'calc(100% - 260px)',
        marginLeft: isLoginPage ? '380px' : '260px',
      }}
    >
      {/* Left Section */}
      <div className={styles.footerLeft}>
        <p className={styles.footerText}>Ext No. IT Office: 294</p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.supportLink}>
          {SUPPORT_EMAIL}
        </a>
      </div>

      {/* Center Section */}
      <div className={`${styles.centerSection} ${isLoginPage ? styles.centerSectionLogin : ''}`}>
        <p className={styles.footerText}>© Australian Islamic College Perth Inc. All rights Reserved.</p>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>

        <p  className={styles.footerText}>Release: {releaseNumber}</p>
         <a 
          href="/privacy-policy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.supportLink}
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;